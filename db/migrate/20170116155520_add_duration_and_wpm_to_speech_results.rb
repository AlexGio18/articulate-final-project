class AddDurationAndWpmToSpeechResults < ActiveRecord::Migration[5.0]
  def change
    add_column :speech_results, :duration, :integer
    add_column :speech_results, :wpm, :float
  end
end
