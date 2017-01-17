class Evaluation extends React.Component {
  constructor() {
    super()
  }

  getStrongEmotion(emotion) {
    debugger
    return this.props.data.doc_emotion[emotion] > .5
  }

  render() {
    var strongEmotions = Object.keys(this.props.data.doc_emotion).filter(this.getStrongEmotion.bind(this))
    console.log(strongEmotions)
    return (
      <div>
        This speech ranks high in {strongEmotions.join(' ')}
      </div>
    )
  }
}
