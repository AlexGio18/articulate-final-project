class CreateDocSocialTones < ActiveRecord::Migration[5.0]
  def change
    create_table :doc_social_tones do |t|
      t.float :openness
      t.float :conscientiousness
      t.float :extraversion
      t.float :agreeableness
      t.float :emotional_range
      t.integer :result_id

      t.timestamps
    end
  end
end
