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
  belongs_to :user
  has_many :keywords, :dependent => :destroy
  has_many :taxonomies, :dependent => :destroy
  has_one :doc_emotion, :dependent => :destroy
  has_one :doc_social_tone, :dependent => :destroy
  has_one :doc_language_tone, :dependent => :destroy

  attr_reader :filler_words, :personality_profile

  def personality_profile
    tone_scores = Hash[ self.doc_social_tone.as_json.collect {|tone, score|
      if score > 0.75
        [tone, "high"]
      elsif score < 0.50
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
    traits.uniq
  end

  private
    def filler_words
      fillers = [" like ", " so ", " basically ", " i guess ", " um ", " umm ", " uh ", " eh ", " you know ", " okay ", " OK "]
      fillers.inject([]) {|memo, filler| !self.transcript.scan(/#{filler}/).empty? ? memo << {word: filler, count: self.transcript.scan(/#{filler}/).count} : memo }
    end
end
