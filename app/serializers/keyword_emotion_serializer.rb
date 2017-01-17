class KeywordEmotionSerializer < ActiveModel::Serializer
  attributes :anger, :fear, :joy, :sadness, :disgust
end
