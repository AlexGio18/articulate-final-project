class ResultsShow extends React.Component{
  constructor() {
    super()
    this.state = {
      result_data: {},
    }
    this.getResult = this.getResult.bind(this)
  }

  componentWillMount() {
    $.ajax({
      url: '/json_test'
    })
    .done(this.getResult)
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
          <BubbleChart/>
        </div>
        <div id="speech-container">
          <div id="speech">
            <SpeechText/>
          </div>
        </div>
      </div>
    )
  }
}
