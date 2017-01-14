require 'eventmachine'
require 'websocket-client-simple'


class StaticController < ApplicationController
  include ApplicationHelper

  def index

  end

  def create
  end

  def results
    settings = {
     'action'             => "start",
     'content-type'       => "audio/wav",
     'continuous'         => true,
     'inactivity_timeout' => -1,
     'interim_results'    => true
   }

   watson_url = "wss://stream.watsonplatform.net/speech-to-text/api/v1/recognize?watson-token=#{token.body}"
   file_url = "./0001.wav"

   init_message = settings.to_json
   ws = ''

   EM.run {
    ws = WebSocket::Client::Simple.connect watson_url
    file_sent = false

    ws.on :message do |event|
      puts "message: #{event.data}"
      data = JSON.parse(event.data)
      if data['state'] && data['state'] == 'listening'
         if file_sent == true
            EM::stop_event_loop
         else
            file_sent = true
            open(file_url, 'rb') do |file|
               file.read_chunk {|chunk| ws.send(chunk, type: :binary) }
            end
            ws.send("", type: :binary)
         end
      end

    end

    ws.on :open do
      puts "-- websocket open"
      puts             init_message
      ws.send(init_message)
    end

    ws.on :close do |e|
      puts "-- websocket close #{if e!=nil then (e) end}"
      exit 1
    end

    ws.on :error do |e|
      puts "-- error (#{e.inspect})"
    end
    }

    ws.close
  end

  def test

  end

  def token
    get_token
  end

end
