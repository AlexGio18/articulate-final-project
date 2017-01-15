class Keyword < ApplicationRecord
  before_create :count
  belongs_to :speech_result


  private
    def count
      transcript = self.speech_result.transcript
      keyword_count = Hash.new
      keyword = keyword["text"]
      keyword_count["count"] = transcript.scan(/(#{keyword})/).count
      keyword_count
    end

end
