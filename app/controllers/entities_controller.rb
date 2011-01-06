class EntitiesController < ApplicationController

  skip_before_filter :verify_authenticity_token
  
  def create
    
    @text = params[:text]
    
    @entities = Entifier.extract(@text)
    
    respond_to do |format|
      format.text { render :text => @entities.join("\n"), :layout => false}
      format.json { render :json => @entities, :layout => nil}
    end
    
  end

  def index
    create
  end

end
