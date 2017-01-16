class SpeechResult < ApplicationRecord
  belongs_to :user
  has_many :keywords, :dependent => :destroy
  has_many :taxonomies, :dependent => :destroy
  has_one :doc_emotion, :dependent => :destroy
  has_one :doc_social_tone, :dependent => :destroy
  has_one :doc_language_tone, :dependent => :destroy
end
