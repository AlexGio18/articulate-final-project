class WebSpeech extends React.Component {

  constructor(){
    super();
    this.state = {
      resultData: {},
    }

    this.getResultData = this.getResultData.bind(this)
  }

  getResultData(response){
    this.setState({
      resultData: response
    })
  }

  componentDidMount() {

    let userID = this.props.currentUser.id

    let finalTranscript = ''
    let resultsContainer = document.getElementById('resultsContainer')
    let altsContainer = document.getElementById('altsContainer')

    var recognition = new webkitSpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = "en-US"
    recognition.maxAlternatives = 1

    recognition.onstart = function() {
      console.log("recording")
    }

    recognition.onend = function() {

      $.ajax({
        url: "/users/"+ userID +"/speech_results",
        method: "POST",
        data: "text="+finalTranscript
      }).done(this.getResultData)

      $(resultsContainer).text(finalTranscript)
    }

    recognition.onresult = function(event) {
      if (typeof(event.results) === 'undefined') {
        recognition.stop()
        console.log("something went wrong...")
      }

      let interimTranscript = ''
      for (var i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript
          console.log(finalTranscript)
        } else {
          console.log("results so far: " + event.results[i][0].transcript)
        }
      }
    }

    let startButton = document.getElementById('startRec')

    startButton.addEventListener('click', function(e) {

      if ($(".record-button").text() === "Start"){
        recognition.start()
        $(".record-button").text("Stop")
        $(".record-button").attr("id", "stopRec")
      } else {
        recognition.stop()
        $(".record-button").text("Start")
        $(".record-button").attr("id", "startRec")
      }
    })
  }

  render() {
    return (
      <div>
        <button className="btn btn-primary btn-lg record-button" id="startRec" ref="stopPlayButton">Start</button>
        <div id="altsContainer"></div>
        <div className="container" id="resultsContainer"></div>
      </div>
    )
  }
}
