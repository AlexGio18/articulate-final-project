class Evaluation extends React.Component {
  constructor() {
    super()
  }

  getStrongEmotion(emotion) {
    return this.props.data.doc_emotion[emotion] > .5
  }

  getStrongLanguageTone(tone) {
    return this.props.data.doc_language_tone[tone] > .8
  }

  isAngry() {
    let anger = this.props.data.doc_emotion["anger"]
    if (anger > 0.01) {
      return (
        <p className="red-flag">You may be perceived as angry</p>
      )
    }
  }

  getSpeed() {
    let speed = this.props.data.wpm
    if (speed < 110) {
      return (
      <p className="red-flag">Your delivery was a little slow. Consider speeding up.</p>
      )
    }
    else if (speed > 155) {
      return (
        <p className="red-flag">You're speaking a bit too quickly. Consider slowing down.</p>
      )
    }
    else {
      return (
        <p>Your delivery speed was great!</p>
      )
    }
  }

  render() {
    console.log(this.props.data)
    let strongEmotions = Object.keys(this.props.data.doc_emotion).filter(this.getStrongEmotion.bind(this))
    let strongLanguageTones = Object.keys(this.props.data.doc_language_tone).filter(this.getStrongLanguageTone.bind(this))

    return (
      <div className="evaluation">

        {this.getSpeed()}

        {this.isAngry()}

        <p>Your speech may be perceived as {this.props.data.personality_profile.join(', ')}</p>
        <p>Emotions: This speech ranks high in {strongEmotions.join(', ')}</p>
        <p>Language Tone: This speech ranks high in {strongLanguageTones.join(', ')}</p>
      </div>
    )
  }
}
