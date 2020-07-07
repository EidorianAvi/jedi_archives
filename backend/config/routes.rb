Rails.application.routes.draw do
  
  resources :novels
  resources :graphic_novels
  post "login", to: "authentication#login"
  resources :users, only: [:index, :create, :show]
end
