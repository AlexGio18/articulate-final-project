class SpeechResultsController < ApplicationController
  before_action :authenticate_user!, only: [:show, :index]

  include SpeechResultsHelper

  def index
    user = User.find(params[:user_id])

    if authorized?(user)
      render json: user.speech_results
    else
      render json: { errors: "Forbidden" }, status: 403
    end
  end

  def test
    result =
      {"id":6,
        "created_at":"2017-01-15T19:57:32.569Z",
        "updated_at":"2017-01-15T19:57:32.569Z",
        "duration": 30000,
        "wpm": 75,
        "transcript":"okay is this working now it is her that's nice but like why is it isn't working no interesting interesting empty quotes they all begin with auntie quotes no nevermind",
        "user":{"id":8,"first_name":"patrick","last_name":"kolo"},
        "taxonomies":[{"label":"/art and entertainment/movies and tv/movies","confident":"no","score":0.333912},{"label":"/art and entertainment/music","confident":"no","score":0.313142},{"label":"/hobbies and interests/reading","confident":"no","score":0.249649}],
        "keywords":[{"text":"auntie quotes","sentiment_type":"negative","sentiment_score":-0.56704,"relevance":0.945119},{"text":"interesting empty quotes","sentiment_type":"negative","sentiment_score":-0.56704,"relevance":0.872418}],
        "doc_emotion":{"anger":0.414406,"fear":0.031043,"joy":0.091798,"sadness":0.480761,"disgust":0.030889},
        "doc_social_tone":{"openness":0.810382,"conscientiousness":0.74176,"extraversion":0.349772,"agreeableness":0.851862,"emotional_range":0.278841},
        "doc_language_tone":{"analytical":0.0,"confident":0.194239,"tentative":0.0}
      }

      render json: result
  end

  def show
    speech_result = SpeechResult.find(params[:id])
    if authorized?(speech_result.user)
        render json: speech_result
    else
      render json: { errors: "Forbidden" }, status: 403
    end
  end

  def create
    user = User.find(params[:user_id])
    tone_response = get_tone(params[:text])
    speech_result = SpeechResult.new(transcript: params[:text], user: user, duration: params[:duration], wpm: params[:wpm])
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

    alchemy_response = get_alchemy_results(params[:text])

    alchemy_response["taxonomies"].map do |taxonomy|
      Taxonomy.create(speech_result: speech_result, confident: taxonomy["confident"], label: taxonomy["label"], score: taxonomy["score"])
    end

    alchemy_response["keywords"].map do |keyword|
      Keyword.create(speech_result: speech_result, relevance: keyword["relevance"], sentiment_score: keyword["sentiment"]["score"], sentiment_type: keyword["sentiment"]["type"], text: keyword["text"])
    end


    render json: speech_result
  end


  protected

    def authorized?(user)
      user == current_user
    end

end
