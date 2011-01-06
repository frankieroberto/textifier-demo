class TermsController < ApplicationController

  skip_before_filter :verify_authenticity_token
  
  def create
    
    @text = params[:text]
    
    @terms = []
    
    options = {:min_occurance => 1}
    
    results = TermExtract.extract(@text, options)
    
    results.each do |term|
      @terms << term[0]
    end
    
    respond_to do |format|
      format.text { render :text => @terms.join("\n"), :layout => false}
      format.json { render :json => @terms, :layout => nil}
    end
    
  end
  
  def index
    create
  end

end
