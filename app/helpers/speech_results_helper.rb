module SpeechResultsHelper

  def parse_tone_result(array, target)
    array.map {|tone| target.write_attribute(tone["tone_name"].downcase.split.join('_').to_sym, tone["score"])}
  end

  def get_tone(text)
    tone_endpoint = "https://#{ENV["WATSON_TONE_USER"]}:#{ENV["WATSON_TONE_PW"]}@gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2016-05-19&text=#{text}"
    response = JSON.parse(RestClient.get(tone_endpoint))
  end

  # def get_keywords(text)
  #   keyword_endpoint = "https://gateway-a.watsonplatform.net/calls/text/TextGetRankedKeywords"
  #   options = { text: text, apikey: ENV["WATSON_API_KEY"], outputMode: 'json', sentiment: 1, emotion: 1 }
  #   response = JSON.parse(RestClient.post(keyword_endpoint, options).body)
  #   response["keywords"]
  # end
  
  def user_length(user)
    user.speech_results.length
  end

  def find_average(array)
    array.inject {|sum, n| sum + n} 
  end

  def get_user_average_emotions(user)
    doc_emotions = user.speech_results.map {|result| result.doc_emotion }
    
    anger_average = find_average(doc_emotions.map {|emotion| emotion.anger }) / user_length(user)
    joy_average = find_average(doc_emotions.map {|emotion| emotion.joy }) / user_length(user)
    disgust_average = find_average(doc_emotions.map {|emotion| emotion.disgust }) / user_length(user)
    sadness_average = find_average(doc_emotions.map {|emotion| emotion.sadness }) / user_length(user)
    fear_average = find_average(doc_emotions.map {|emotion| emotion.fear }) / user_length(user)

    {anger_avg: anger_average, joy_avg: joy_average, disgust_avg: disgust_average, sadness_avg: sadness_average, fear_avg: fear_average}
  end

  def get_user_average_social_tone(user)
    doc_social_tone = user.speech_results.map {|result| result.doc_social_tone }

    openness_average = find_average(doc_social_tone.map {|social| social.openness }) / user_length(user)
    conscientiousness_average = find_average(doc_social_tone.map {|social| social.conscientiousness}) / user_length(user)
    extraversion_average = find_average(doc_social_tone.map {|social| social.extraversion}) / user_length(user)
    agreeableness_average = find_average(doc_social_tone.map {|social| social.agreeableness}) / user_length(user)
    emotional_range_average = find_average(doc_social_tone.map {|social| social.emotional_range}) / user_length(user)

    {opennes_avg: openness_average, conscientiousness_avg: conscientiousness_average, extraversion_avg: extraversion_average, agreeableness_avg: agreeableness_average, emotional_range_avg: emotional_range_average}
  end

  def get_user_average_language_tone(user)
    doc_language_tone = user.speech_results.map {|result| result.doc_language_tone }

    analytical_average = find_average(doc_language_tone.map {|language| language.analytical }) / user_length(user)
    confident_average = find_average(doc_language_tone.map {|language| language.confident }) / user_length(user)
    tentative_average = find_average(doc_language_tone.map {|language| language.tentative }) / user_length(user)

    { analytical_avg: analytical_average, confident_avg: confident_average, tentative_avg: tentative_average }
  end

  def get_average_user_wpm(user)
    find_average(user.speech_results.map {|result| result.wpm }) / user_length(user)
  end

  def get_alchemy_results(text)
    json = {}
    service = WatsonAPIClient::AlchemyLanguage.new(apikey: ENV["WATSON_API_KEY"],
                                                   verify_ssl: OpenSSL::SSL::VERIFY_NONE)
    result = service.TextGetRankedTaxonomy_get(text: text, outputMode:"json")
    response = JSON.parse(result.body)
    json["taxonomies"] = response["taxonomy"]

    keyword_endpoint = "https://gateway-a.watsonplatform.net/calls/text/TextGetRankedKeywords"
    options = { text: text, apikey: ENV["WATSON_API_KEY"], outputMode: 'json', sentiment: 1, emotion: 1 }
    response = JSON.parse(RestClient.post(keyword_endpoint, options).body)

    json["keywords"] = response["keywords"]
    json
  end

end
