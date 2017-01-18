class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :speech_length, :average_emotions, :average_social_tone, :average_language_tone, :average_user_wpm
end
