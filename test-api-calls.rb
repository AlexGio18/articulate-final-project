#
# API Endpoint = "https://gateway.watsonplatform.net/tone-analyzer/api/v3"

# WORKING FOR ALCHEMY CALLS

require 'watson-api-client'

# service = WatsonAPIClient::ToneAnalyzer.new(username: ENV["WATSON_TONE_USER_NAME"],
#                                             password: ENV["WATSON_TONE_PASSWORD"],
#                                             version: 'v3',
#                                             version_date: '2016-05-19')

service = WatsonAPIClient::AlchemyLanguage.new(apikey: ENV["WATSON_API_KEY"],
                                               verify_ssl: OpenSSL::SSL::VERIFY_NONE)

result = service.TextGetEmotion_get(text: "Hello i am some text", outputMode:"json")

p JSON.parse(result.body)
