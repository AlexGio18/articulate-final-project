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
    var that = this
    $.ajax({
      url: '/json_test',
      dataType: "json"
    }).done(function(response){
      that.setState({
        speech: response.transcript
      })
    })

  }
  render(){
    return(
        <div className="dropdown">
          <button className="btn btn-primary" type="button" data-toggle="dropdown" onClick={this.handleSpeechDisplay}>See Speech Text
          <span className="caret"></span></button>
          <p id ="speech-text">{this.state.speech}</p>
      </div>
    )
  }
}
