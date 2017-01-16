class Keyword extends React.Component {
  constructor() {
    super()
  }

  render() {
    debugger
    return(
      <div id="keyword">
        <p>text: {this.props.keyword.text}</p>
        <p>relevance: {this.props.keyword.relevance}</p>
        <p>sentiment: {this.props.keyword.sentiment_score}</p>
        <p></p>
      </div>
    )
  }
}
