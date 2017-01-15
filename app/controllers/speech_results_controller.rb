require 'json'
class SpeechResultsController < ApplicationController
  def index
  end

  def show
    # speech = {
    #   "document_tone": {
    #     "tone_categories": [
    #       {
    #         "tones": [
    #           {
    #             "score": 0.122074,
    #             "tone_id": "anger",
    #             "tone_name": "Anger"
    #           },
    #           {
    #             "score": 0.466388,
    #             "tone_id": "disgust",
    #             "tone_name": "Disgust"
    #           },
    #           {
    #             "score": 0.162443,
    #             "tone_id": "fear",
    #             "tone_name": "Fear"
    #           },
    #           {
    #             "score": 0.542211,
    #             "tone_id": "joy",
    #             "tone_name": "Joy"
    #           },
    #           {
    #             "score": 0.225703,
    #             "tone_id": "sadness",
    #             "tone_name": "Sadness"
    #           }
    #         ],
    #         "category_id": "emotion_tone",
    #         "category_name": "Emotion Tone"
    #       },
    #       {
    #         "tones": [
    #           {
    #             "score": 0.867915,
    #             "tone_id": "analytical",
    #             "tone_name": "Analytical"
    #           },
    #           {
    #             "score": 0,
    #             "tone_id": "confident",
    #             "tone_name": "Confident"
    #           },
    #           {
    #             "score": 0.664434,
    #             "tone_id": "tentative",
    #             "tone_name": "Tentative"
    #           }
    #         ],
    #         "category_id": "language_tone",
    #         "category_name": "Language Tone"
    #       },
    #       {
    #         "tones": [
    #           {
    #             "score": 0.694488,
    #             "tone_id": "openness_big5",
    #             "tone_name": "Openness"
    #           },
    #           {
    #             "score": 0.68608,
    #             "tone_id": "conscientiousness_big5",
    #             "tone_name": "Conscientiousness"
    #           },
    #           {
    #             "score": 0.500131,
    #             "tone_id": "extraversion_big5",
    #             "tone_name": "Extraversion"
    #           },
    #           {
    #             "score": 0.287042,
    #             "tone_id": "agreeableness_big5",
    #             "tone_name": "Agreeableness"
    #           },
    #           {
    #             "score": 0.315252,
    #             "tone_id": "emotional_range_big5",
    #             "tone_name": "Emotional Range"
    #           }
    #         ],
    #         "category_id": "social_tone",
    #         "category_name": "Social Tone"
    #       }
    #     ]
    #   }
    # }
    respond_to do |format|
      format.html #{ redirect_to 'index' }
      format.json { render json: speech}
    end
  end

end
