TRAIT_MAP = {
  "polite":             {"agreeableness"=>"high", "conscientiousness"=>"high"},
  "unpretentious":      {"agreeableness"=>"high", "conscientiousness"=>"low"},
  "happy":              {"agreeableness"=>"high", "extraversion"=>"high"},
  "humble":             {"agreeableness"=>"high", "extraversion"=>"low"},
  "passionate":         {"agreeableness"=>"high", "emotional_range"=>"high"},
  "pleasant":           {"agreeableness"=>"high", "emotional_range"=>"low"},
  "idealistic":         {"agreeableness"=>"high", "openness"=>"low"},
  "inconsiderate":      {"agreeableness"=>"low", "conscientiousness"=>"low"},
  "combative":          {"agreeableness"=>"low", "extraversion"=>"high"},
  "cynical":            {"agreeableness"=>"low", "extraversion"=>"low"},
  "critical":           {"agreeableness"=>"low", "emotional_range"=>"high"},
  "unemotional":        {"agreeableness"=>"low", "emotional_range"=>"low"},
  "eccentric":          {"agreeableness"=>"low", "openness"=>"high"},
  "callous":            {"agreeableness"=>"low", "openness"=>"low"},

  "purposeful":         {"conscientiousness"=>"high", "extraversion"=>"high"},
  "boisterous":         {"conscientiousness"=>"low", "extraversion"=>"high"},
  "cautious":           {"conscientiousness"=>"high", "extraversion"=>"low"},
  "indecisive":         {"conscientiousness"=>"low", "extraversion"=>"low"},
  "high-strung":        {"conscientiousness"=>"high", "emotional_range"=>"high"},
  "inconsistent":       {"conscientiousness"=>"low", "emotional_range"=>"high"},
  "consistent":         {"conscientiousness"=>"high", "emotional_range"=>"low"},
  "informal":           {"conscientiousness"=>"low", "emotional_range"=>"low"},
  "refined":            {"conscientiousness"=>"high", "openness"=>"high"},
  "unconventional":     {"conscientiousness"=>"low", "openness"=>"high"},
  "traditional":        {"conscientiousness"=>"high", "openness"=>"low"},
  "lax":                {"conscientiousness"=>"high", "openness"=>"low"},

  "explosive, wordy":   {"extraversion"=>"high", "emotional_range"=>"high"},
  "guarded":            {"extraversion"=>"low", "emotional_range"=>"high"},
  "assured":            {"extraversion"=>"high", "emotional_range"=>"low"},
  "unassuming":         {"extraversion"=>"low", "emotional_range"=>"low"},
  "dramatic":           {"extraversion"=>"high", "openness"=>"high"},
  "introspective":      {"extraversion"=>"low", "emotional_range"=>"high"},
  "verbose":            {"extraversion"=>"high", "emotional_range"=>"low"},
  "meek":               {"extraversion"=>"low", "emotional_range"=>"low"},

  "excitable":          {"emotional_range"=>"high", "openness"=>"high"},
  "heartfelt":          {"emotional_range"=>"low", "openness"=>"high"},
  "apprehensive":       {"emotional_range"=>"high", "openness"=>"low"},
  "insensitive":        {"emotional_range"=>"low", "openness"=>"low"},
}

class SpeechResult < ApplicationRecord
  include SpeechResultsHelper

  belongs_to :user
  has_many :keywords, :dependent => :destroy
  has_many :taxonomies, :dependent => :destroy
  has_one :doc_emotion, :dependent => :destroy
  has_one :doc_social_tone, :dependent => :destroy
  has_one :doc_language_tone, :dependent => :destroy

  attr_reader :filler_words, :personality_profile

  def generate_analysis(transcript)
    tone_response = get_tone(transcript)

    tone_classes = [[DocEmotion, 0], [DocLanguageTone, 1], [DocSocialTone, 2]]
    tone_classes.each { |tone_info| self.generate_tone_results(tone_response, tone_info) }

    alchemy_response = get_alchemy_results(transcript)
    self.get_keywords(alchemy_response)
    self.get_taxonomies(alchemy_response)
  end

  def generate_tone_results(tone_response, class_info)
    new_tone_object = class_info[0].new(speech_result: self)
    emotion_array = tone_response["document_tone"]["tone_categories"][class_info[1]]["tones"]
    parse_tone_result(emotion_array, new_tone_object)
    new_tone_object.save

    class_method = class_info[0].to_s.underscore
    self.send("#{class_method}=", new_tone_object)
  end

  def get_taxonomies(alchemy_response)
    alchemy_response["taxonomies"].map do |taxonomy|
      Taxonomy.create(speech_result: self, confident: taxonomy["confident"], label: taxonomy["label"], score: taxonomy["score"])
    end
  end

  def get_keywords(alchemy_response)
    alchemy_response["keywords"].map do |keyword|
      k_word = Keyword.create(speech_result: self, relevance: keyword["relevance"], sentiment_score: keyword["sentiment"]["score"], sentiment_type: keyword["sentiment"]["type"], text: keyword["text"])
      keyword_emotion = KeywordEmotion.create(anger: keyword["emotions"]["anger"], disgust: keyword["emotions"]["disgust"], fear: keyword["emotions"]["fear"], joy: keyword["emotions"]["joy"], sadness: keyword["emotions"]["sadness"])
      k_word.keyword_emotion = keyword_emotion
    end
  end

  def personality_profile
    tone_scores = Hash[ self.doc_social_tone.as_json.collect {|tone, score|
      if score > 0.85
        [tone, "high"]
      elsif score < 0.4
        [tone, "low"]
      else
        [tone, score]
      end
    }]

    traits = []

    tone_scores.each do |outer_tone, outer_score|
      tone_scores.each do |inner_tone, inner_score|
        x = {}
        x[outer_tone] = outer_score
        x[inner_tone] = inner_score
        traits << TRAIT_MAP.key(x).to_s if TRAIT_MAP.key(x)
      end
    end
    if traits.empty?
      ["emotionally balanced"]
    else
      traits.uniq
    end
  end

  private
    def filler_words
      fillers = [" like ", " basically ", " i guess ", " um ", " umm ", " uh ", " eh ", " you know ", " okay ", " OK ", " okay ", " yeah ", " sort of ", " sorta ", " oh ", " and so ", " kind of ", " kinda ", " so yeah ", " i mean ", " you see ", " know what i mean ", " i suppose "]
      fillers.inject([]) {|memo, filler| !self.transcript.scan(/#{filler}/).empty? ? memo << {word: filler, count: self.transcript.scan(/#{filler}/).count} : memo }
    end
end
