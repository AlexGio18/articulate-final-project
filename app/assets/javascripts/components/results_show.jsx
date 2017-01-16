class ResultsShow extends React.Component{
  constructor() {
    super()
    this.state = {
      result_data: {},
    }
    this.getResult = this.getResult.bind(this)
  }

  componentWillMount() {
    debugger
  if (this.props.resultData === {}){
    $.ajax({
      url: "/users/"+this.props.current_user.id+"/speech_results/"+localStorage.getItem("id")
    })
    .done(this.getResult)

  }else{
    this.getResult(this.props.resultData)
  }
    
}

  getResult(response) {
    this.setState({
      result_data: response
    })
  }

  render(){
    return(
      <div id="results-container">

          {this.state.result_data.keywords && <Keywords keywords={this.state.result_data.keywords} />}

          {this.state.result_data.taxonomies && <Taxonomies taxonomies={this.state.result_data.taxonomies} />}

        <div id="chart">
          <BubbleChart userID={this.props.current_user.id}/>
        </div>
        <div id="speech-container">
          <div id="speech">
            {this.state.result_data.transcript && <SpeechText transcript={this.state.result_data.transcript}/>}
          </div>
        </div>
      </div>
    )
  }
}
