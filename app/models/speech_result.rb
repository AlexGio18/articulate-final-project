class SpeechResult < ApplicationRecord
  belongs_to :user
  has_one :doc_emotion
  has_one :taxonomies
  has_one :doc_social_tone
  has_one :doc_language_tone
  has_many :keywords
end
