class Evaluation extends React.Component {
  constructor() {
    super()
  }

  emotionFeedback() {
    let anger = this.props.data.doc_emotion["anger"]
    if ((anger - this.props.data.user["average_emotions"]["anger_avg"]) > 0.5) {
      return (
        <p className="red-flag">Compared to your average, the content of this speech seems angry.</p>
      )
    }
    else if (anger > 0.8) {
      return (
        <p className="red-flag">You may be perceived as angry.</p>
      )
    }
  }

  speedFeedback() {
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
        <p className="green-flag">Your delivery speed was great!</p>
      )
    }
  }

  confidenceFeedback() {
    let confidence = this.props.data.doc_language_tone["confident"]
    let tentativeness = this.props.data.doc_language_tone["tentative"]
    let avg_confidence = this.props.data.user["average_language_tone"]["confidence"]
    let avg_tentativeness = this.props.data.user["average_language_tone"]["tentative"]
    if ((confidence - avg_confidence) > 0.5) {
      return (
      <p className="green-flag">Compared to your average, you seem confident in your message.</p>
      )
    }
    else if ((tentativeness - avg_tentativeness) > 0.5) {
      return (
        <p className="red-flag">Compared to your average, you seem less confident in your message.</p>
      )
    }
    else if (confidence > 0.8) {
      return (
        <p className="green-flag">You seem to be confident in your message.</p>
      )
    }
    else if (tentativeness > 0.8) {
      return (
        <p className="red-flag">You seem to be tentative about your message.</p>
      )
    }
    return
  }

  fillerFeedback() {
    let fillerRate = (this.props.fillerCount / (this.props.data.duration / 1000 / 60))
    if (fillerRate > 3) {
      return (
        <p className="red-flag">You used a high rate of filler words.</p>
      )
    }
  }

  render() {
    console.log(this.props.data)

    return (
      <div className="evaluation">

        <h1 className="feedback-header">Feedback</h1>

        {(this.props.data.wpm > 0) && this.speedFeedback()}

        {(this.props.data.wpm > 0) && this.fillerFeedback()}

        {this.emotionFeedback()}

        {this.confidenceFeedback()}

        <p>Your speech may be described as  {this.props.data.personality_profile.join(', ')}.</p>

      </div>
    )
  }
}
