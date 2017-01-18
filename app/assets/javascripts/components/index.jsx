class Index extends React.Component {

  constructor() {
    super()
    this.state={
      resultData: false,
      errors: "",
      speechInput: true
    }
    this.webSpeechResults = this.webSpeechResults.bind(this)
    this.handleTranscriptErrors = this.handleTranscriptErrors.bind(this)
    this.handleInputType = this.handleInputType.bind(this)
  }

  webSpeechResults(data) {
    this.setState({
      resultData: data
    })
    console.log(data)
  }

  handleTranscriptErrors(error){
    this.setState({
      errors: error
    })
  }

  handleInputType(e) {
    e.preventDefault()
    this.setState({
      speechInput: false
    })
  }

  render(){
    return(
      <div className="starter-template container-padding">
        <div className="wrapper">

          <div className="welcome">
            {this.state.display_booleans && <Timer />}
            <h1 id="just-play">Just Press Start.</h1>
            <a href="/" onClick={this.handleInputType}><p>(click here for text input instead)</p></a>
          </div>

          {this.state.speechInput && <WebSpeech currentUser={this.props.current_user} results={this.webSpeechResults} errorCheck={this.handleTranscriptErrors} />}

          {!this.state.speechInput && <TextForm currentUser={this.props.current_user} results={this.webSpeechResults} errorCheck={this.handleTranscriptErrors} />}

          <div className="errors">
            {(this.state.errors.length > 0) && <Errors />}
          </div>

          {this.state.resultData && <ResultsShow result_data={this.state.resultData} />}
        </div>

      </div>
    )
  }
}
