Rails.application.routes.draw do
  
  resources :novels
  resources :graphic_novels
  resources :users, only: [:index, :create, :show]
  post "login", to: "authentication#login"
end
