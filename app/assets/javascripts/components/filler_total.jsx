class FillerTotal extends React.Component {
  constructor() {
    super()
  }

  getTotalFiller(filler_words) {
    filler_words.reduce(function(total,word) {
      return total + word.count
    }, 0)
  }

  render() {
    return (
      <h1>{this.getTotalFiller(this.props.fillers)}</h1>
    )
  }
}
