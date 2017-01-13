class CreateSpeechResults < ActiveRecord::Migration[5.0]
  def change
    create_table :speech_results do |t|
      t.text :transcript
      t.integer :user_id

      t.timestamps
    end
  end
end
