class SpeechResultsController < ApplicationController
  include SpeechResultsHelper

  before_action :authenticate_user!, only: [:show, :index]

  def index
    user = User.find(params[:user_id])
    if authorized?(user)
      render json: user.speech_results.order(id: :desc), include: ['speech_result']
    else
      render json: { errors: "Forbidden" }, status: 403
    end
  end

  def show
    speech_result = SpeechResult.find(params[:id])
    if authorized?(speech_result.user)
        render json: speech_result, include: [:user, :doc_emotion, :doc_language_tone, :doc_social_tone, :taxonomies, :keywords]
    else
      render json: { errors: "Forbidden" }, status: 403
    end
  end

  def create
    speech_result = SpeechResult.new(speech_result_params)
    speech_result.user = current_user
    speech_result.save
    
    if speech_result.generate_analysis(speech_result.transcript.gsub(/\P{ASCII}/, "")) && speech_result.keywords.any?
      render json: speech_result
    else
      speech_result.destroy
      render json: { errors: "Forbidden" }, status: 403
    end
  end


  protected

    def speech_result_params
      params.require(:speech_result).permit(:duration, :wpm, :user_id, :transcript)
    end

    def authorized?(user)
      user == current_user
    end

end
