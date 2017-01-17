class ProfileController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index]

  def index
  end

  def history
  end

  def record
  end

end
