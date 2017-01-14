require 'json'
require 'uri'
require 'net/http'

class StaticController < ApplicationController

  def index

  end

  def create
  end

  def results
    binding.pry
  end

  def get_token
    token = ''
    uri = URI.parse("https://stream.watsonplatform.net/authorization/api/v1/token?url=https://stream.watsonplatform.net/speech-to-text/api")
    Net::HTTP.start(uri.host, uri.port,:use_ssl => uri.scheme == 'https') do |http|
      request = Net::HTTP::Get.new(uri)
      request.basic_auth "011ff9a0-b290-442c-8e6f-0c5919db5786", "MCoVrJxvqUnl"
      token = http.request(request)
    end
  end

  protected
    def static_params
      params.require(:static).permits(:url)
    end

end
