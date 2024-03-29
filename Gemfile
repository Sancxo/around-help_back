source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.1.2"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 7.0.3"

# Use postgresql as the database for Active Record
gem "pg", "~> 1.1"
# JSON validator for database
gem 'json-schema', '~> 3.0'

# Use the Puma web server [https://github.com/puma/puma]
gem "puma", "~> 5.0"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[ mingw mswin x64_mingw jruby ]

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

# Auth [https://github.com/heartcombo/devise]
gem 'devise', '~> 4.8', '>= 4.8.1'
gem 'devise-jwt', '~> 0.9.0'

gem 'bcrypt', '~> 3.1', '>= 3.1.18'

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
gem "rack-cors"

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
gem "image_processing", "~> 1.2"
gem 'ruby-vips', '~> 2.1', '>= 2.1.4'
# Active Storage validations [https://github.com/igorkasyanchuk/active_storage_validations]
gem 'active_storage_validations'

# In this Rails version (7.0.3.1), we need a version of Redis strictly inferior to 5 in order to work with Action Cable
gem 'redis', '~> 4.8', '>= 4.8.1'

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: %i[ mri mingw x64_mingw ]
end

group :development do
  # Speed up commands on slow machines / big apps [https://github.com/rails/spring]
  # gem "spring"
end

group :test do
  gem 'shoulda-context', '~> 2.0'
end

