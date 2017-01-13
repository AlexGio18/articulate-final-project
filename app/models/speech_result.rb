class SpeechResult < ApplicationRecord
  belongs_to :user
  has_many :doc_emotions
  has_many :taxonomies
  has_many :doc_social_tones
  has_many :doc_language_tones
  has_many :keywords
end
