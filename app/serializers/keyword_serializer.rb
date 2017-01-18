class KeywordSerializer < ActiveModel::Serializer
  attributes :text, :sentiment_type, :sentiment_score, :relevance, :count, :keyword_emotion
  belongs_to :speech_result
end
