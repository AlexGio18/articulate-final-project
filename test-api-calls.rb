#
# API Endpoint = "https://gateway.watsonplatform.net/tone-analyzer/api/v3"

# WORKING FOR ALCHEMY CALLS

# Returns the big 5 emotions with their score as a hash (ex: {"anger"=>"0.353717", ...})
def document_emotions(service, text)
  result = service.TextGetEmotion_get(text: text, outputMode:"json")

  response = JSON.parse(result.body)

  response["docEmotions"]
end

# Returns document keywords as an array, where each element is a hash ex: ( {"relevance"=>"0.914023", "text"=>"gray veil"} )
def document_keywords(service, text)
  result = service.TextGetRankedKeywords_get(text: text, outputMode:"json")

  response = JSON.parse(result.body)

  response["keywords"]
end

# Returns document taxonomies as an array, where each element is a hash
# ex: ( {"label"=>"/health and fitness/disorders/mental disorder/depression", "score"=>"0.69369"} )
# Warning: some versions have an extra key:value ("confident"=>"no")
# These should likely not be included
def document_taxonomies(service, text)
  result = service.TextGetRankedTaxonomy_get(text: text, outputMode:"json")

  response = JSON.parse(result.body)

  taxonomies = response["taxonomy"]

  # This next line will take out hierarchies the API is NOT confinent about:
  # confident_hierarchies = taxonomies.reject {|hierarchy| hierarchy.has_key?("confident")}
end

# FOR TONE ANALYZER

def get_tone(username, password, text, version = '2016-05-19')
  tone_endpoint = "https://#{username}:#{password}@gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=#{version}&text=#{text}"
  response = JSON.parse(RestClient.get(tone_endpoint))
  language_tone_array = response["document_tone"]["tone_categories"][1]["tones"]
  social_tone_array = response["document_tone"]["tone_categories"][2]["tones"]
end
