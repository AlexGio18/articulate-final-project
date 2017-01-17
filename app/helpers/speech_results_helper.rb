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
