class CreateTaxonomies < ActiveRecord::Migration[5.0]
  def change
    create_table :taxonomies do |t|
      t.string :label_heirarchy
      t.float :score
      t.string :confident
      t.integer :speech_result_id, foreign_key: true

      t.timestamps
    end
  end
end
