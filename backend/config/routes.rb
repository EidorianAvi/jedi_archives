Rails.application.routes.draw do
  
  post "login", to: "authentication#login"
  resources :users, only: [:index, :create, :show]
end
