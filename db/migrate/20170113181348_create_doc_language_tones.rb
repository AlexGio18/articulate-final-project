class CreateDocLanguageTones < ActiveRecord::Migration[5.0]
  def change
    create_table :doc_language_tones do |t|
      t.float :analytical
      t.float :confident
      t.float :tentative
      t.integer :speech_result_id, foreign_key: true

      t.timestamps
    end
  end
end
