class ErrorsController < ApplicationController
  def routing
    raise ActionController::RoutingError.new('404! PAGE NOT FOUND')
  end
end
