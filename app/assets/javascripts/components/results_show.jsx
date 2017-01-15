class ResultsShow extends React.Component{
  constructor() {
    super()
    this.state = {
      result_data: {}
    }
    this.getResult = this.getResult.bind(this)
  }

  componentDidMount() {
    $.ajax({
      url: '/json_test'
    })
    .done(this.getResult)
  }

  getResult(response) {
    this.setState({
      result_data: response
    })
    debugger
  }

  render(){
    return(
  <div>
    <div id="chart">
      <BubbleChart/>
    </div>
    <div id="keywords">
      <Keywords keywords={this.state.result_data.keywords}/>
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
