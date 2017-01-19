class ProfileController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index]

  def index
    current_user
  end

  def history
    user = User.find(current_user.id)
    @speech_results = user.speech_results.order(id: :desc)
    if @speech_results.length > 0
      @average_emotions = user.average_emotions
      @average_social_tone = user.average_social_tone
      @average_language_tone = user.average_language_tone
      @average_user_wpm = user.average_user_wpm
    end
  end

  def record
    @speech_result = SpeechResult.find(params[:id])
  end

end
