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

    tone_response = get_tone(params[:speech_result][:transcript])

    speech_result.get_doc_emotion(tone_response)
    speech_result.get_doc_language_tone(tone_response)
    speech_result.get_doc_social_tone(tone_response)

    # Parsing Alchemy

    alchemy_response = get_alchemy_results(params[:speech_result][:transcript])

    alchemy_response["taxonomies"].map do |taxonomy|
      Taxonomy.create(speech_result: speech_result, confident: taxonomy["confident"], label: taxonomy["label"], score: taxonomy["score"])
    end

    alchemy_response["keywords"].map do |keyword|
      k_word = Keyword.create(speech_result: speech_result, relevance: keyword["relevance"], sentiment_score: keyword["sentiment"]["score"], sentiment_type: keyword["sentiment"]["type"], text: keyword["text"])
      keyword_emotion = KeywordEmotion.create(anger: keyword["emotions"]["anger"], disgust: keyword["emotions"]["disgust"], fear: keyword["emotions"]["fear"], joy: keyword["emotions"]["joy"], sadness: keyword["emotions"]["sadness"])
      k_word.keyword_emotion = keyword_emotion
    end


    render json: speech_result
  end


  protected

    def speech_result_params
      params.require(:speech_result).permit(:duration, :wpm, :user_id, :transcript)
    end

    def authorized?(user)
      user == current_user
    end

end
