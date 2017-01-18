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
    return minutes+':'+seconds
  }

  getTotalFiller(filler_words) {
    var count = filler_words.reduce(function(total,word) {
      return total + word.count
    }, 0)
    return count
  }

  render(){

    return(
      <div id="results-container">

        {this.props.result_data.keywords && <Evaluation data={this.props.result_data} />}

        <div className="row meta-results">
          <div className="col-sm-4">
            <div className="result-box-sm">
              <h1>{Math.round(this.props.result_data.wpm)}</h1>
              <span className="result-box-text">words per minute</span>
            </div>
          </div>

          <div className="col-sm-5">
            <div className="result-box-sm">
              <h1>{this.getTimer(this.props.result_data.duration)}</h1>
              <span className="result-box-text">total speech duration</span>
            </div>
          </div>

          <div className="col-sm-3">

            <div className="result-box-sm">
                <h1>{this.getTotalFiller(this.props.result_data.filler_words)}</h1>

              <span className="result-box-text">filler words</span>
            </div>
          </div>
        </div>

          <div className="col-sm-4">
            <div className="result-box-md">
              {this.props.result_data.keywords && <RadarChart keywords={this.props.result_data.keywords} />}
            </div>
          </div>

        <div className="row row-eq-height meta-results">
          <div className="col-sm-4">
            <div className="result-box-md">
              {this.props.result_data.taxonomies && <Taxonomies taxonomies={this.props.result_data.taxonomies} />}
            </div>
          </div>

          <div className="col-sm-4">
            <div className="result-box-sm">
              {this.props.result_data.filler_words && <FillerWords fillers={this.props.result_data.filler_words }/>}
            </div>
          </div>
        </div>

        <div id="chart">
          {this.props.result_data.doc_emotion && <BubbleChart result_data={this.props.result_data} userID={this.props.current_user.id}/> }
        </div>
        <div id="speech-container">
          <div id="speech">
            {this.props.result_data.transcript && <SpeechText transcript={this.props.result_data.transcript}/>}
          </div>
        </div>
      </div>
    )
  }
}
