class WebSpeech extends React.Component {

  constructor(){
    super();
    this.state = {
      display_booleans: false,
      resultData: {},
    }
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

      $('.welcome').slideUp('slow')
      $("#recording-components").show()

      startTime = new Date().getTime()
      console.log("recording")
    }

    recognition.onend = function() {
      endTime = new Date().getTime()
      $('#webspeech').slideUp('slow')

      $( "<div class='loading'>Results are loading...</div>" ).appendTo('.wrapper')

      duration = endTime - startTime
      let data = {
        speech_result: {
          transcript: finalTranscript,
          duration: duration,
          wpm: (finalTranscript.split(' ').length / (duration / 1000 / 60))
        }
      }


      if (data.speech_result.transcript != ""){
        $.ajax({
          url: "/users/"+userID+"/speech_results",
          method: "POST",
          data: $.param(data)
        }).done(function(response){
          //callback function setting response in parent
          that.props.results(response)
          $('.loading').remove()
        })
      }
      else{
        that.props.errorCheck("ERROR")
      }
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
        }
      }
    }

    let startButton = document.getElementById('startRec')

    startButton.addEventListener('click', function(e) {

      if ($(".record-button").text() === "Start"){
        $(".record-button").text("Stop")
        $(".record-button").attr("id", "stopRec")
        recognition.start()
      } else {
        recognition.stop()
        $(".record-button").text("Start")
        $(".record-button").attr("id", "startRec")
      }
    })
  }


  render() {
    return (
      <div id="webspeech">
        {this.state.display_booleans && <AudioVisualizer  /> }
        <button className="btn btn-primary btn-lg record-button" id="startRec" ref="stopPlayButton">Start</button>
        {this.state.display_booleans && <Timer />}
      </div>
    )
  }
}
