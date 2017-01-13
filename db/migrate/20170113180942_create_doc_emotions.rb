class CreateDocEmotions < ActiveRecord::Migration[5.0]
  def change
    create_table :doc_emotions do |t|
      t.float :anger
      t.float :disgust
      t.float :fear
      t.float :joy
      t.float :sadness
      t.integer :speech_result_id, foreign_key: true

      t.timestamps
    end
  end
end
