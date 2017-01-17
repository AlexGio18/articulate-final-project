class SpeechResult < ApplicationRecord
  belongs_to :user
  has_many :keywords, :dependent => :destroy
  has_many :taxonomies, :dependent => :destroy
  has_one :doc_emotion, :dependent => :destroy
  has_one :doc_social_tone, :dependent => :destroy
  has_one :doc_language_tone, :dependent => :destroy

  attr_reader :filler_words

  def get_user_average_emotions(user)
    results_length = users.speech_results.length
    doc_emotions = user.speech_results.map {|result| result.doc_emotion }
    
    anger_average = doc_emotions.map {|emotion| emotion.anger }.inject {|sum, n| sum + n} / results_length
    joy_average = doc_emotions.map {|emotion| emotion.joy }.inject {|sum, n| sum + n} / results_length
    disgust_average = doc_emotions.map {|emotion| emotion.disgust }.inject {|sum, n| sum + n} / results_length
    sadness_average = doc_emotions.map {|emotion| emotion.sadness }.inject {|sum, n| sum + n} / results_length
    fear_average = doc_emotions.map {|emotion| emotion.fear }.inject {|sum, n| sum + n} / results_length

    [anger_average, joy_average, disgust_average, sadness_average, fear_average]
  end

  private
    def filler_words
      fillers = [" like ", " so ", " basically ", " i guess ", " um ", " umm ", " uh ", " eh ", " you know ", " okay ", " OK "]
      fillers.inject([]) {|memo, filler| !self.transcript.scan(/#{filler}/).empty? ? memo << {word: filler, count: self.transcript.scan(/#{filler}/).count} : memo }
    end
end
