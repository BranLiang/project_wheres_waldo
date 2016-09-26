Rails.application.routes.draw do

  resources :tags, only: [:index, :create, :destroy]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
