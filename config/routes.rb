Rails.application.routes.draw do
  devise_for :users, :controllers => {:registrations => "user/registrations"}
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "static#index"

  get "/test", to: "static#test"
  post "/static", to: "static#create"
end
