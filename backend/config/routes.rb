Rails.application.routes.draw do
  
  resources :novels, only: [:index, :create, :show]
  resources :graphic_novels, only: [:index, :create, :show]
  resources :users, only: [:index, :create, :show]
  post "login", to: "authentication#login"
end
