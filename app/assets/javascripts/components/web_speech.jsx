class WebSpeech extends React.Component {

  constructor(){
    super();
    this.state = {
      display_booleans: false,
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
    let that = this
    let userID = this.props.currentUser.id

    let finalTranscript = ''
    let resultsContainer = document.getElementById('resultsContainer')
    let altsContainer = document.getElementById('altsContainer')
    let startTime = 0
    let endTime = 0
    let duration = 0

    var recognition = new webkitSpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = "en-US"
    recognition.maxAlternatives = 1

    recognition.onstart = function() {
      that.setState({
        display_booleans: true,
      })
      $("#just-play").hide()
      $("#text-analyzer").hide()
      $("#recording-components").show()
      startTime = new Date().getTime()
      console.log("recording")
    }

    recognition.onend = function() {
      endTime = new Date().getTime()
      duration = endTime - startTime
      let data = {
        speech_result: {
          transcript: finalTranscript,
          duration: duration,
          wpm: (finalTranscript.split(' ').length / (duration / 1000 / 60))
        }
      }
      console.log(duration)
      console.log(data)

      $.ajax({
        url: "/json_test",
        method: "GET"
        // data: $.param(data)
      }).done(function(response){
        that.getResultData(response)
      })

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
          let interimTime = new Date().getTime()
          duration = interimTime - startTime
          finalTranscript += event.results[i][0].transcript
          console.log(finalTranscript)
          $('.wpmContainer').text("Current WPM: " + (finalTranscript.split(' ').length / (duration / 1000 / 60)))
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
      {this.state.display_booleans && <Timer />}
      <h1 id="just-play">Just Press Start.</h1>
      <a href="#textAnalyzer" id="text-analyzer"><p>You can also analyze text(below)</p></a>

        <div>
          <button className="btn btn-primary btn-lg record-button" id="startRec" ref="stopPlayButton">Start</button>
          <div className="wpmContainer"></div>
          <div className="container results" id="resultsContainer">{this.state.resultData.transcript && <ResultsShow resultData={this.state.resultData} current_user={this.props.currentUser}/>}</div>
              {this.state.display_booleans && <AudioVisualizer  /> }
        </div>
      </div>
    )
  }
}
