Rails.application.routes.draw do
  devise_for :users,
    controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations'
    }

  authenticate :user do
    mount ActionCable.server => "/cable"
    get 'user', to: 'users#this'
    get 'user/:id', to: 'users#show'
    put 'user', to: 'users#update'
    patch 'user', to: 'users#update'

    resources :needs
    resources :addresses
    resources :chat_rooms
    get 'chat_room/:need_id', to: 'chat_rooms#get_from_need_id'
    resources :chat_messages
  end
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
