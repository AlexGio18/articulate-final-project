class CreateDocEmotions < ActiveRecord::Migration[5.0]
  def change
    create_table :doc_emotions do |t|
      t.float :anger
      t.float :disgust
      t.float :fear
      t.float :joy
      t.float :sadness
      t.integer :result_id

      t.timestamps
    end
  end
end
