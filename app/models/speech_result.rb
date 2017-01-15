class SpeechResult < ApplicationRecord
  belongs_to :user
  has_many :keywords
  has_many :taxonomies
  has_one :doc_emotion
  has_one :doc_social_tone
  has_one :doc_language_tone
end
