Rails.application.routes.draw do
  devise_for :users, :controllers => {:registrations => "user/registrations"}
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "static#index"
  get "/profile", to:"profile#index"
  get "/profile/history", to:"profile#history"
  get "/profile/history/:id", to: "profile#record"
  get "/test", to: "static#test"
  post "/static", to: "static#create"
  get "/get_token", to: "static#token"
  post "/results", to: "static#results"
  get '/json_test', to: "speech_results#test"

  resources :users, only: [] do
    resources :speech_results, only: [:index, :show, :create]
  end

  post "/static" => "static#create"
end
