class TagsController < ApplicationController
  def index
    @tags = Tag.all
    respond_to do |format|
      format.html
      format.json { render json: @tags, status: 200 }
    end
  end

  def create
    @tag = Tag.new(white_list_params)
    if @tag.save
      respond_to do |format|
        format.json { render json: @tag, status: 200 }
      end
    end
  end

  private
    def white_list_params
      params.require(:tag).permit(:name, :coordx, :coordy)
    end

end
