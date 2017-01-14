#
# API Endpoint = "https://gateway.watsonplatform.net/tone-analyzer/api/v3"

# WORKING FOR ALCHEMY CALLS

require 'watson-api-client'

service = WatsonAPIClient::ToneAnalyzer.new(username: ENV["WATSON_TONE_USER_NAME"],
                                            password: ENV["WATSON_TONE_PASSWORD"],
                                            version: '2016-05-19')

service = WatsonAPIClient::AlchemyLanguage.new(apikey: ENV["WATSON_API_KEY"],
                                               verify_ssl: OpenSSL::SSL::VERIFY_NONE)

result = service.TextGetEmotion_get(text: "Hello i am some text", outputMode:"json")

p JSON.parse(result.body)



# FOR TONE ANALYZER

def get_tone(username, password, text, version = '2016-05-19')
  tone_endpoint = "https://#{username}:#{password}@gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=#{version}&text=#{text}"
  response = JSON.parse(RestClient.get(tone_endpoint))
  language_tone_array = response["document_tone"]["tone_categories"][1]["tones"]
  social_tone_array = response["document_tone"]["tone_categories"][2]["tones"]
end
