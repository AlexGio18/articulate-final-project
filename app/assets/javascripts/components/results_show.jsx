class ResultsShow extends React.Component{
  constructor() {
    super()
    this.state = {
      result_data: {},
    }
    this.getResult = this.getResult.bind(this)
  }

  componentWillMount() {
    if (localStorage.getItem("id")){
      $.ajax({
        url: "/users/"+this.props.current_user.id+"/speech_results/"+localStorage.getItem("id")
      })
      .done(this.getResult)
      localStorage.removeItem("id")
    }else{
      localStorage.setItem("id", this.props.resultData.id)
      this.getResult(this.props.resultData)
    }
  }

  getResult(response) {
    this.setState({
      result_data: response
    })
  }


  getTimer(duration) {
    var seconds = duration / 1000
    var minutes = parseInt( seconds / 60 )
    seconds = Math.round(seconds % 60)
    return minutes+':'+seconds
  }

  getTotalFiller(filler_words) {
    filler_words.reduce(function(total,word) {
      return total + word.count
    }, 0)
  }

  render(){
    let total_filler = 15

    return(
      <div id="results-container">
        <div className="row meta-results">
          <div className="col-sm-4">
            <div className="result-box-sm">
              <h1>{Math.round(this.state.result_data.wpm)}</h1>
              <span className="result-box-text">words per minute</span>
            </div>
          </div>

          <div className="col-sm-5">
            <div className="result-box-sm">
              <h1>{this.getTimer(this.state.result_data.duration)}</h1>
              <span className="result-box-text">total speech duration</span>
            </div>
          </div>

          <div className="col-sm-3">
            <div className="result-box-sm"> {this.state.result_data.filler_words && <h1>{total_filler}</h1>}
              <span className="result-box-text">filler words</span>
            </div>
          </div>
        </div>

        <div className="row row-eq-height meta-results">
          <div className="col-sm-8">
            <div className="result-box-md">
              {this.state.result_data.taxonomies && <Taxonomies taxonomies={this.state.result_data.taxonomies} />}
            </div>
          </div>

          <div className="col-sm-4">
            <div className="result-box-sm">
              {this.state.result_data.filler_words && <FillerWords fillers={this.state.result_data.filler_words }/>}
            </div>
          </div>
        </div>

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
