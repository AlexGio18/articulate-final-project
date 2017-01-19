class ResultsShow extends React.Component{
  constructor() {
    super()
  }

  componentDidMount(){
    this.getTotalFiller()
  }

  getTimer(duration) {
    var seconds = duration / 1000
    var minutes = parseInt( seconds / 60 )
    seconds = Math.round(seconds % 60)
    if (seconds < 10 ) {
      seconds = '0' + seconds
    }
    return minutes+':'+seconds
  }

  getTotalFiller() {
    if (this.props.result_data.filler_words) {
      let fillerWords = this.props.result_data.filler_words
      var count = fillerWords.reduce(function(total,word) {
        return total + word.count
      }, 0)
      return count
    }
  }

  fillerColor() {
    if (this.props.result_data.filler_words) {
      if ((this.getTotalFiller() / 1000 / 60) > 3) {
        return "red-flag"
      } else {
        return "green-flag"
      }
    }
  }

  speedColor() {
    if (this.props.result_data.wpm) {
      let wpm = this.props.result_data.wpm
      if ((wpm > 155) || (wpm < 110)) {
        return "red-flag"
      } else {
        return "green-flag"
      }
    }
  }

  isSpeechInput() {
    if (this.props.result_data.wpm > 0) {
      return(
        <div className="row meta-results">
          <div className="col-sm-4">
            <div className="result-box-lg">
              <h1 className={this.speedColor()}>{Math.round(this.props.result_data.wpm)}</h1>
              <span className="result-box-text">words per minute</span>
            </div>
          </div>

          <div className="col-sm-5">
            <div className="result-box-lg middle">
              <h1 id="blue-header">{this.getTimer(this.props.result_data.duration)}</h1>
              <span className="result-box-text">total speech duration</span>
            </div>
          </div>

          <div className="col-sm-3">
            <div className="result-box-lg">
                <h1 id="blue-header" className={this.fillerColor()}>{this.getTotalFiller(this.props.result_data.filler_words)}</h1>
              <span className="result-box-text">filler words</span>
            </div>
          </div>
        </div>
      )
    }
  }

  render(){
    return(
      <div id="results-container">

        {this.props.result_data.keywords && <Evaluation data={this.props.result_data} fillerCount={this.getTotalFiller()}/>}


        {this.isSpeechInput()}

        <div className="col-lg-7 col-md-7 col-xl-7">
          <div className="result-box-md">
            {this.props.result_data.keywords && <RadarChart keywords={this.props.result_data.keywords} />}
          </div>
        </div>

        <div className="row row-eq-height">
          <div className="col-lg-5 col-md-5 col-xl-5">
              {this.props.result_data.taxonomies && <Taxonomies taxonomies={this.props.result_data.taxonomies} />}
          </div>

          <div className="col-lg-5 col-md-5 col-xl-5">
              {this.props.result_data.filler_words && <FillerWords fillers={this.props.result_data.filler_words }/>}
          </div>
        </div>

        <div className="bubble-chart-wrapper">
          <div className="bubble-chart" id="chart">
            {this.props.result_data.doc_emotion && <BubbleChart result_data={this.props.result_data} userID={this.props.result_data.user.id}/> }
          </div>
        </div>

        <div className="container" id="speech-container">
          <div id="speech">
            {this.props.result_data.transcript && <SpeechText transcript={this.props.result_data.transcript}/>}
          </div>
        </div>
      </div>
    )
  }
}
