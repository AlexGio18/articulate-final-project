class KeywordSerializer < ActiveModel::Serializer
  attributes :text, :sentiment_type, :sentiment_score, :relevance, :count
  has_one :keyword_emotion
end
