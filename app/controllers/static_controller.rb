require 'json'
require 'uri'
require 'net/http'

class StaticController < ApplicationController

  def index

  end

  def create
  end

  def results
  end

  def test

  end

  def token
    token = ''
    uri = URI.parse("https://stream.watsonplatform.net/authorization/api/v1/token?url=https://stream.watsonplatform.net/speech-to-text/api")
    Net::HTTP.start(uri.host, uri.port,:use_ssl => uri.scheme == 'https') do |http|
        request = Net::HTTP::Get.new(uri)
        request.basic_auth ENV["WATSON_S2T_USER"], ENV["WATSON_S2T_PW"]
        token = http.request(request)
    end
    render json: {token: token.body}
  end

end
