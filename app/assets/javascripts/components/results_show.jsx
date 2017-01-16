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

        <div id="keywords">
          {this.state.result_data.keywords && <Keywords keywords={this.state.result_data.keywords} />}
        </div>

        <div id="taxonomies">
          {this.state.result_data.taxonomies && <Taxonomies keywords={this.state.result_data.taxonomies}}
        </div>

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
