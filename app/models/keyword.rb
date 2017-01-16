class Keyword < ApplicationRecord
  after_save :count
  belongs_to :speech_result


  private
    def count
      transcript = self.speech_result.transcript
      keyword = self.text
      @count = transcript.scan(/(#{keyword})/).count
      @count
    end

end
