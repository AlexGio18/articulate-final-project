class SpeechResult < ApplicationRecord
  belongs_to :user
  has_many :keywords, :dependent => :destroy
  has_many :taxonomies, :dependent => :destroy
  has_one :doc_emotion, :dependent => :destroy
  has_one :doc_social_tone, :dependent => :destroy
  has_one :doc_language_tone, :dependent => :destroy

  attr_reader :filler_words

  private
    def filler_words
      fillers = [" like ", " so ", " basically ", " i guess ", " um ", " umm ", " uh ", " eh ", " you know ", " okay ", " OK "]
      fillers.inject([]) {|memo, filler| !self.transcript.scan(/#{filler}/).empty? ? memo << {word: filler, count: self.transcript.scan(/#{filler}/).count} : memo }
    end
end
