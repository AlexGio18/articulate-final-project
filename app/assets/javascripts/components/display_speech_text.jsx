class SpeechText extends React.Component{

  handleSpeechDisplay(){
    if ($("#speech-text").is(":hidden")) {
        $("#speech-text").slideDown(500);
    }
    else {
        $("#speech-text").hide();
    }
  }
  
  constructor(){
    super()
    this.state = {
      speech: "",
    }
    this.handleSpeechDisplay = this.handleSpeechDisplay.bind(this)
  }

  componentDidMount(){
    $("#speech-text").hide()
  }

  render(){
    return(
        <div className="dropdown">
          <button className="btn btn-secondary minimalist-button center-button" type="button" data-toggle="dropdown" onClick={this.handleSpeechDisplay}>See Speech Text
          <span className="caret"></span></button>
          <p className="speech-text" id="speech-text">{this.props.transcript}</p>
      </div>
    )
  }
}
