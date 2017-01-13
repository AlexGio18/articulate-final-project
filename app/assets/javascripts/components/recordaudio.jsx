class RecordAudio extends React.Component {
  handleClick(){
    $("#playcord").text("Stop Recording")
  }

componentDidMount(){

    navigator.getUserMedia  = navigator.getUserMedia ||
                              navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia ||
                              navigator.msGetUserMedia;

    navigator.getUserMedia({video: false, audio: true}, function(stream) {
      let mediaRecorder = new MediaRecorder(stream)
      let chunks = []
      mediaRecorder.ondataavailable = function(e) {
          chunks.push(e.data)
      }
      let finishRecording = function() {
        mediaRecorder.stop()

        let audio = document.createElement('audio')
        let container = document.getElementById('audiocontainer')
        container.appendChild(audio)

        let blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' })
        debugger
        chunks = []
        let audiosrc = window.URL.createObjectURL(blob)
        audio.setAttribute('src', audiosrc)
        audio.setAttribute('autoplay', '')
      }

      let button = document.getElementById('playcord')
      button.addEventListener('click', function(e) {
        if (mediaRecorder.state === 'recording') {
          finishRecording()
        } else {
          mediaRecorder.start()
          window.setTimeout(function() {
            finishRecording()
          }, 30000)
        }
      })
    }, function(error) {
      console.warn(error)
    })
  }

  render(){
    return(
      <div>
        <button id="playcord" onClick={this.handleClick.bind(this)}>Start Recording</button>
        <div id="audiocontainer"></div>
      </div>
    )
  }

}
