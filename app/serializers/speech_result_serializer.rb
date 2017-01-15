class SpeechResultSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :updated_at
  has_many :taxonomies
  has_many :keywords
  has_one :doc_emotion
  has_one :doc_social_tone
  has_one :doc_language_tone
end
