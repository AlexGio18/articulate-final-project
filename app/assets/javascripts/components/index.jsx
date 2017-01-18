class Index extends React.Component {

  constructor() {
    super()
    this.state={
      resultData: [],
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

          {this.state.display_booleans && <Timer />}
          <h1 id="just-play">Just Press Start.</h1>
          <a href="/" onClick={this.handleInputType}><p>(click here for text input instead)</p></a>

          {this.state.speechInput && <WebSpeech currentUser={this.props.current_user} results={this.webSpeechResults} errorCheck={this.handleTranscriptErrors} />}

          {!this.state.speechInput && <TextForm currentUser={this.props.current_user} results={this.webSpeechResults} errorCheck={this.handleTranscriptErrors} />}

          <div className="errors">
            {(this.state.errors.length > 0) && <Errors />}
          </div>

        </div>

      </div>
    )
  }
}
