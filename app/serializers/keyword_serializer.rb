class KeywordSerializer < ActiveModel::Serializer
  attributes :text, :sentiment_type, :sentiment_score, :relevance, :count
  belongs_to :speech_result
  has_one :keyword_emotion
end
