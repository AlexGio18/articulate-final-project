class SpeechResultSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :updated_at
  has_one :doc_emotion
  has_one :doc_social_tone
  has_one :doc_language_tone
end
