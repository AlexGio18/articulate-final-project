class WebSpeech extends React.Component {

  handleClick(){
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
          console.log("stopped recording")
          let url = window.location.pathname

          $.ajax({
            url: url + "/speech_results",
            method: "POST",
            data: "text="+finalTranscript
          }).done(function(response){
            console.log(response)
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
              finalTranscript += event.results[i][0].transcript
              console.log(finalTranscript)
            } else {
              console.log("results so far: " + event.results[i][0].transcript)
            }
          }
        }

        let toggleButton = this.refs.stopPlayButton

        if (toggleButton.textContent === "Start"){
          recognition.start()
          toggleButton.textContent = "Stop"
        } else {
          recognition.stop()
          toggleButton.textContent = "Start"
        }

        // let startButton = document.getElementById('startRec')
        // let stopButton = document.getElementById('stopRec')

        // startButton.addEventListener('click', function(e) {
        //   recognition.start()
        // })
        //
        // stopButton.addEventListener('click', function(e) {
        //   recognition.stop()
        // })

  }

  componentDidMount() {

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
      console.log("stopped recording")
      let url = window.location.pathname

      $.ajax({
        url: url + "/speech_results",
        method: "POST",
        data: "text="+finalTranscript
      }).done(function(response){
        console.log(response)
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
          finalTranscript += event.results[i][0].transcript
          console.log(finalTranscript)
        } else {
          console.log("results so far: " + event.results[i][0].transcript)
        }
      }
    }

    let startButton = document.getElementById('startRec')
    let stopButton = document.getElementById('stopRec')

    startButton.addEventListener('click', function(e) {
      recognition.start()
    })

    stopButton.addEventListener('click', function(e) {
      recognition.stop()
    })
  }

  render() {
    return (
      <div>
        <button className="btn btn-primary btn-lg" id="startRec" ref="stopPlayButton">Start</button>
        <button className="btn btn-primary btn-lg" id="stopRec">Stop</button>
        <div id="altsContainer"></div>
        <div id="resultsContainer"></div>
      </div>
    )
  }
}
