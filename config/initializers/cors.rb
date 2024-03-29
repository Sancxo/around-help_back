# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    unless ENV["RAILS_ENV"] == "test"
      origins ENV["FRONT_URL"]
    end

    resource "*",
    headers: 'x-domain-token',
    methods: [:get, :post, :put, :patch, :delete, :options, :head],
    expose: %w[Authorization Uid],
    credentials: true
  end
end
