class CreateKeywords < ActiveRecord::Migration[5.0]
  def change
    create_table :keywords do |t|
      t.string :text
      t.string :sentiment_type
      t.float :sentiment_score
      t.float :relevance
      t.integer :speech_result_id, foreign_key: true

      t.timestamps
    end
  end
end
