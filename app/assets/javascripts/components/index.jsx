class Index extends React.Component {

  constructor() {
    super()
    this.state={
      resultData: []
    }
    this.webSpeechResults = this.webSpeechResults.bind(this)
  }

webSpeechResults(data) {
  this.setState({
    resultData: data,
  })
}

  render(){
    return(
      <div>
        <div className="starter-template container-padding">
          <div className="wrapper">

            <WebSpeech currentUser={this.props.current_user} results={this.webSpeechResults}  />

            <div id="textAnalyzer">
              <h1>Text Analysis</h1>
              <TextForm currentUser={this.props.current_user} results={this.webSpeechResults} />
            </div>

            {this.state.resultData.transcript && <ResultsShow result_data={this.state.resultData} current_user={this.props.current_user}/>}

          </div>
        </div>
      </div>
    )
  }
}
