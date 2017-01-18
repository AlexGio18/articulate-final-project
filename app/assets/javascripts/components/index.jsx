class Index extends React.Component {

  constructor() {
    super()
    this.state={
      resultData: [],
      errors: "",
    }
    this.webSpeechResults = this.webSpeechResults.bind(this)
    this.handleTranscriptErrors = this.handleTranscriptErrors.bind(this)
  }

  webSpeechResults(data) {
    this.setState({
      resultData: data,
    })
  }

  handleTranscriptErrors(error){
    this.setState({
      errors: error,
    })
  }

  render(){
    return(
      <div className="starter-template container-padding">
        <div className="wrapper">

          <WebSpeech currentUser={this.props.current_user} results={this.webSpeechResults} errorCheck={this.handleTranscriptErrors} />

          <div className="container results" id="resultsContainer">
            {(this.state.errors.length > 0) && <Errors />}
          </div>

        </div>

          <TextForm currentUser={this.props.current_user} />

      </div>
    )
  }
}
