class SpeechResultsController < ApplicationController
  include SpeechResultsHelper

  def index
  end

  def show
  end

  def create
    @user = User.find(params[:user_id])
    @speech_result = SpeechResult.new
    # get tone data
    language_tone_array = tone_response["document_tone"]["tone_categories"][1]["tones"]
    @doc_language_tone = DocLanguageTone.new
    launguage_tone_array.map {|tone| DocLanguageTone.write_attribute(tone["tone_name"].downcase.to_sym, tone["score"])}

    social_tone_array = response["document_tone"]["tone_categories"][2]["tones"]
    binding.pry
  end

  def test
    text = "this is some text ok"
    tone_response = get_tone(text)
    @speech_result = SpeechResult.new(transcript: text)

    @doc_emotion = DocEmotion.new(speech_result: @speech_result)
    emotion_array = tone_response["document_tone"]["tone_categories"][0]["tones"]
    parse_result(emotion_array, @doc_emotion)
    @speech_result.doc_emotion = @doc_emotion

    @doc_language_tone = DocLanguageTone.new(speech_result: @speech_result)
    language_tone_array = tone_response["document_tone"]["tone_categories"][1]["tones"]
    parse_result(language_tone_array, @doc_language_tone)
    @speech_result.doc_language_tone = @doc_language_tone

    @doc_social_tone = DocSocialTone.new(speech_result: @speech_result)
    social_tone_array = tone_response["document_tone"]["tone_categories"][2]["tones"]
    parse_result(social_tone_array, @doc_social_tone)
    @speech_result.doc_social_tone = @doc_social_tone

    binding.pry
  end

end
