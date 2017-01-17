class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :speech_results, :dependent => :destroy

  attr_reader :speech_length, :average_emotions, :average_social_tone, :average_language_tone, :average_user_wpm

  def move_to(user)
   user.speech_results.update_all(user_id: user.id)
   user.update_attributes(guest: nil)
  end

  def speech_length
    self.speech_results.length
  end

  def find_average(array)
    array.inject {|sum, n| sum + n} 
  end

  private
  def average_emotions
    doc_emotions = self.speech_results.map {|result| result.doc_emotion }
    
    anger_average = find_average(doc_emotions.map {|emotion| emotion.anger }) / self.speech_length
    joy_average = find_average(doc_emotions.map {|emotion| emotion.joy }) / self.speech_length
    disgust_average = find_average(doc_emotions.map {|emotion| emotion.disgust }) / self.speech_length
    sadness_average = find_average(doc_emotions.map {|emotion| emotion.sadness }) / self.speech_length
    fear_average = find_average(doc_emotions.map {|emotion| emotion.fear }) / self.speech_length

    {anger_avg: anger_average, joy_avg: joy_average, disgust_avg: disgust_average, sadness_avg: sadness_average, fear_avg: fear_average}
  end

  def average_social_tone
    doc_social_tone = self.speech_results.map {|result| result.doc_social_tone }

    openness_average = find_average(doc_social_tone.map {|social| social.openness }) / self.speech_length
    conscientiousness_average = find_average(doc_social_tone.map {|social| social.conscientiousness}) / self.speech_length
    extraversion_average = find_average(doc_social_tone.map {|social| social.extraversion}) / self.speech_length
    agreeableness_average = find_average(doc_social_tone.map {|social| social.agreeableness}) / self.speech_length
    emotional_range_average = find_average(doc_social_tone.map {|social| social.emotional_range}) / self.speech_length

    {opennes_avg: openness_average, conscientiousness_avg: conscientiousness_average, extraversion_avg: extraversion_average, agreeableness_avg: agreeableness_average, emotional_range_avg: emotional_range_average}
  end

  def average_language_tone
    doc_language_tone = self.speech_results.map {|result| result.doc_language_tone }

    analytical_average = find_average(doc_language_tone.map {|language| language.analytical }) / self.speech_length
    confident_average = find_average(doc_language_tone.map {|language| language.confident }) / self.speech_length
    tentative_average = find_average(doc_language_tone.map {|language| language.tentative }) / self.speech_length

    { analytical_avg: analytical_average, confident_avg: confident_average, tentative_avg: tentative_average }
  end

  def average_user_wpm
    find_average(self.speech_results.map {|result| result.wpm }) / self.speech_length
  end

end
