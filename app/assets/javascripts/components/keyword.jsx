class Keyword extends React.Component {
  constructor() {
    super()
  }

  render() {
    return(
      <div className="keyword">
        <h4>text: {this.props.keyword.text}</h4>
        <p>relevance: {this.props.keyword.relevance}</p>
        <p>sentiment: {this.props.keyword.sentiment_score}</p>
        <p>sentiment_type: {this.props.keyword.sentiment_type}</p>
      </div>
    )
  }
}
