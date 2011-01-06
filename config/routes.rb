TextifierDemo::Application.routes.draw do
  
  
  resources :adjectives
  resources :entities
  resources :terms

  root :to => "homepage#show"

end
