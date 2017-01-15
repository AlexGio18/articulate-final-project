class KeywordSerializer < ActiveModel::Serializer
  attributes :text, :sentiment_type, :sentiment_score, :relevance
end
