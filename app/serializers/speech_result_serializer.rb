class SpeechResultSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :updated_at, :transcript, :duration, :wpm, :filler_words, :personality_profile
  belongs_to :user
  has_many :taxonomies
  has_many :keywords, include: :keyword_emotion
  has_one :doc_emotion
  has_one :doc_social_tone
  has_one :doc_language_tone
end
