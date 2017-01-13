class CreateTaxonomies < ActiveRecord::Migration[5.0]
  def change
    create_table :taxonomies do |t|
      t.string :label_heirarchy
      t.float :score
      t.string :confident
      t.integer :speech_result_id

      t.timestamps
    end
  end
end
