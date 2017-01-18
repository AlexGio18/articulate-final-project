class Evaluation extends React.Component {
  constructor() {
    super()
  }

  isAngry() {
    let anger = this.props.data.doc_emotion["anger"]
    if (anger > 0.8) {
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

  isConfident() {
    let confidence = this.props.data.doc_language_tone["confident"]
    let tentativeness = this.props.data.doc_language_tone["tentative"]

    if (confidence > 0.8) {
      return (
        <p>You seem to be confident in your message.</p>
      )
    }
    else if (tentativeness > 0.8) {
      return (
        <p className="red-flag">You seem to be tentative about your message.</p>
      )
    }
    return
  }

  render() {
    console.log(this.props.data)

    return (
      <div className="evaluation">

        {this.getSpeed()}

        {this.isAngry()}

        {this.isConfident()}

        <p>Your speech may be described as  {this.props.data.personality_profile.join(', ')}</p>

      </div>
    )
  }
}
