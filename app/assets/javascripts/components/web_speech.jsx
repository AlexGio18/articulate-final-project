class WebSpeech extends React.Component {

  componentDidMount() {

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
    }

    recognition.onresult = function(event) {
      let resultsContainer = document.getElementById('resultsContainer')
      let altsContainer = document.getElementById('altsContainer')
      if (typeof(event.results) === 'undefined') {
        recognition.stop()
        console.log("something went wrong...")
      }

      for (var i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          console.log("final results: " + event.results[i][0].transcript)
          $(resultsContainer).append(event.results.transcript)
        } else {
          console.log("results so far: " + event.results[i][0].transcript)
          $(altsContainer).text(event.results[i][0].transcript)
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
        <button id="startRec">Start</button>
        <button id="stopRec">Stop</button>
        <div id="altsContainer"></div>
        <div id="resultsContainer"></div>
      </div>
    )
  }
}
