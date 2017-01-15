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
    text = "so this is some test I'm speaking and generating text for the experimental program or trying to get speech to text in the browser then we're trying to get texts out of the browser and then we're trying to analyze the text using the Alchemy API very exciting stuff if you ask me but hey that's just my opinion"
    tone_response = get_tone(text)
    @speech_result = SpeechResult.new(transcript: text)

    # Parsing tone analyzer

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

    # Parsing Alchemy

    alchemy_response = get_alchemy_results(text)



  end

end
