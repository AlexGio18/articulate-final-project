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
        <h1 className="red-flag">You may be perceived as angry</h1>
      )
    }
  }

  render() {
    console.log(this.props.data)
    let strongEmotions = Object.keys(this.props.data.doc_emotion).filter(this.getStrongEmotion.bind(this))
    let strongLanguageTones = Object.keys(this.props.data.doc_language_tone).filter(this.getStrongLanguageTone.bind(this))

    return (
      <div className="evaluation">

        {this.isAngry()}

        <p>Your speech may be perceived as {this.props.data.personality_profile.join(', ')}</p>
        <p>Emotions: This speech ranks high in {strongEmotions.join(', ')}</p>
        <p>Language Tone: This speech ranks high in {strongLanguageTones.join(', ')}</p>
      </div>
    )
  }
}
