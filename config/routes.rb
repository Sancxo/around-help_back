Rails.application.routes.draw do
  devise_for :users,
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  mount ActionCable.server, at: "/cable"

  # authenticate :user do
    get 'user', to: 'users#this'
    get 'user/:id', to: 'users#show'
    put 'user', to: 'users#update'
    patch 'user', to: 'users#update'

    resources :needs
    resources :need_users

    resources :addresses

    resources :chat_rooms
    get 'chat_room/:need_id', to: 'chat_rooms#get_from_need_id'
    get 'chat_rooms_list/:user_id', to: 'chat_rooms#get_chat_rooms_with_needs_preload'
    resources :chat_room_users
    
    resources :chat_messages
    get 'chat_messages_list/:chat_room_id', to: 'chat_messages#get_chat_messages_by_chat_room_id'
  # end
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
