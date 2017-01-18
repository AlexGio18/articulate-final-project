class KeywordEmotionSerializer < ActiveModel::Serializer
  attributes :anger, :fear, :joy, :sadness, :disgust
  belongs_to :keyword
end
