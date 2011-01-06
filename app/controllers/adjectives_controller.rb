class AdjectivesController < ApplicationController
  
  skip_before_filter :verify_authenticity_token
  
  def create
    
    @text = params[:text]
    
    @adjectives = Adjectifier.extract(@text)
    
    respond_to do |format|
      format.text { render :text => @adjectives.join("\n"), :layout => false}
      format.json { render :json => @adjectives, :layout => nil}
    end
    
  end

  def index
    create
  end

end
