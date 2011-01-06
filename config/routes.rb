TextifierDemo::Application.routes.draw do
  
  
  resources :adjectives
  resources :entities

  root :to => "homepage#show"

end
