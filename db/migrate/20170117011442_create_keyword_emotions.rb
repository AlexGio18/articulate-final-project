class CreateKeywordEmotions < ActiveRecord::Migration[5.0]
  def change
    create_table :keyword_emotions do |t|
      t.float :anger
      t.float :disgust
      t.float :fear
      t.float :joy
      t.float :sadness
      t.integer :keyword_id, foreign_key: true

      t.timestamps
    end
  end
end
