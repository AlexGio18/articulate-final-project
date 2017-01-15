class AddCountToKeywords < ActiveRecord::Migration[5.0]
  def change
    add_column :keywords, :count, :integer
  end
end
