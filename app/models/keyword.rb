class Keyword < ApplicationRecord
  after_save :count
  belongs_to :speech_result
  has_one :keyword_emotion, :dependent => :destroy


  private
    def count
      transcript = self.speech_result.transcript
      keyword = self.text
      @count = transcript.scan(/(#{keyword})/).count
      @count
    end

end
