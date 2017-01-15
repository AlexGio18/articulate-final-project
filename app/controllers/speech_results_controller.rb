class SpeechResultsController < ApplicationController
  include SpeechResultsHelper

  def index
  end

  def show
  end

  def create
    text = "did you know it's pretty interesting how every time somebody asks you to talk with nothing to say and you have what everybody wants you to shut up you have everything to say I could keep talking all day long and then people get upset and then as soon as they text me first story my mind goes blank"

    @user = User.find(params[:user_id])
    tone_response = get_tone(text)
    @speech_result = SpeechResult.new(transcript: text, user: @user)
    @speech_result.save

    # Parsing tone analyzer

    @doc_emotion = DocEmotion.new(speech_result: @speech_result)
    emotion_array = tone_response["document_tone"]["tone_categories"][0]["tones"]
    parse_tone_result(emotion_array, @doc_emotion)
    @speech_result.doc_emotion = @doc_emotion
    @doc_emotion.save

    @doc_language_tone = DocLanguageTone.new(speech_result: @speech_result)
    language_tone_array = tone_response["document_tone"]["tone_categories"][1]["tones"]
    parse_tone_result(language_tone_array, @doc_language_tone)
    @speech_result.doc_language_tone = @doc_language_tone
    @doc_language_tone.save

    @doc_social_tone = DocSocialTone.new(speech_result: @speech_result)
    social_tone_array = tone_response["document_tone"]["tone_categories"][2]["tones"]
    parse_tone_result(social_tone_array, @doc_social_tone)
    @speech_result.doc_social_tone = @doc_social_tone
    @doc_social_tone.save

    # Parsing Alchemy

    alchemy_response = get_alchemy_results(text)

    alchemy_response["taxonomies"].map do |taxonomy|
      Taxonomy.create(speech_result: @speech_result, confident: taxonomy["confident"], label: taxonomy["label"], score: taxonomy["score"])
    end

    alchemy_response["keywords"].map do |keyword|
      Keyword.create(speech_result: @speech_result, relevance: keyword["relevance"], sentiment_score: keyword["sentiment"]["score"], sentiment_type: keyword["sentiment"]["type"], text: keyword["text"])
    end



  end

  def test
    @speech_result = SpeechResult.find(1)
    render json: @speech_result
  end

end
