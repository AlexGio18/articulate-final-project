    require 'base64'
    require 'rake'
class StaticController < ApplicationController

  def index

  end

  def create
    save_path = Rails.root.join("public/")
      unless File.exists?(save_path)
        Dir::mkdir(Rails.root.join("public/"))
      end
    audio= params[:audio]
    audio_data=Base64.decode64(audio['data:audio/ogg; codecs=opus;base64,'.length .. -1])
    File.open(save_path+"audioFile", 'wb') do |f|

      f.write audio_data
    end

    current_user.user_detail.audio=File.open(save_path+"audioFile")
    current_user.user_detail.audio_content_type="application/octet-stream"

  end

end
