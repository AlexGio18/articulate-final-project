class CreateKeywords < ActiveRecord::Migration[5.0]
  def change
    create_table :keywords do |t|
      t.string :text
      t.string :sentiment
      t.float :relavance
      t.integer :speech_result_id

      t.timestamps
    end
  end
end
