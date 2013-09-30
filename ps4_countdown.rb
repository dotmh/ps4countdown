require "bundler/setup"

Bundler.require :default

class PS4CountDown < Sinatra::Base


  get "/" do
    haml :index , format: :html5
  end

  # start the server if ruby file executed directly
  run! if app_file == $0

end