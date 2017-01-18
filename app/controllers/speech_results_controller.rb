class SpeechResultsController < ApplicationController
  before_action :authenticate_user!, only: [:show, :index]

  include SpeechResultsHelper

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
    tone_response = get_tone(params[:speech_result][:transcript])
    speech_result = SpeechResult.new(speech_result_params)
    speech_result.user = current_user
    speech_result.save

    # Parsing tone analyzer

    doc_emotion = DocEmotion.new(speech_result: speech_result)
    emotion_array = tone_response["document_tone"]["tone_categories"][0]["tones"]
    parse_tone_result(emotion_array, doc_emotion)
    speech_result.doc_emotion = doc_emotion
    doc_emotion.save

    doc_language_tone = DocLanguageTone.new(speech_result: speech_result)
    language_tone_array = tone_response["document_tone"]["tone_categories"][1]["tones"]
    parse_tone_result(language_tone_array, doc_language_tone)
    speech_result.doc_language_tone = doc_language_tone
    doc_language_tone.save

    doc_social_tone = DocSocialTone.new(speech_result: speech_result)
    social_tone_array = tone_response["document_tone"]["tone_categories"][2]["tones"]
    parse_tone_result(social_tone_array, doc_social_tone)
    speech_result.doc_social_tone = doc_social_tone
    doc_social_tone.save

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
