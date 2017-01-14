class RecordAudio extends React.Component {
  handleClick(){
    if ($("#playcord").text() === "Start Recording"){
      return($("#playcord").text("Stop Recording"))
    }else{
      return($("#playcord").text("Start Recording"))
    }
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
          console.log(chunks.push(e.data))
      }
      let finishRecording = function() {
        mediaRecorder.stop()

        let audio = document.createElement('audio')
        let container = document.getElementById('audiocontainer')
        container.appendChild(audio)

        let blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' })

        let token = "PCtsEZR8vVnJ4RFkrx2D3c0FJ4kMo3qr0xN7yNME9jnlJB%2FA4fDe3P11Rj%2BfZ6KBAavwbmWkRTylW3N%2BYI8j5%2F1OgOLcdf7cA4RxqLOGwbexxzn3oSjM5rR%2BX70QJ2SxTHz1Qc%2FH8%2B1JgJteYqAjOgsekZ6ShWsBTaOsFAS6CHlz42r25tb7VRPtmmBVjHny2uLNGt9NyihyK4MiFaQFJ7F0YxCaHIUdk9kBsgHK%2BqvwbZa%2FSoS2S6JfzaU1ekxB331e5biaH9Cz0UPO8XsHXiux8Tnt7RoigOzIYo9rRQqP%2BVz00UGFgLkVl8U9b9P5v9HXwttSSlu%2FeDuzKSFOFZXiUvup2V56mTDpU8rxHnIksAPosY0e3b39GcEDV8DUeC0sg9Jk%2BiJVHVRSCbM9WxV99vXx1EWAyx8KDZLaf6lzK2JTBDZsyaYvP4C4bSgwAq9wQE97M42E5zuLn2O0e2ejW7GLDSf5BXz7gsh0qe%2F53XKCENSrSwzC%2Bz8qqVsnG8KkBsWQXOQVJs8lsnT5X%2BDw5FUwekXMJEE76dJ4qRBObaing2LQ%2FM1SgMdfjR5JgOLRAanKonRSXFuMp%2F2Bp%2FsIG589cCTGAPQv2ROkK9mFRA1yJoVMJ8Q97ZguxDWwYd8lCqeBm3U4COH8qdthNJh0Klmy5mytjpgkfzTl6b0JpDfVV4IZUcXoKhlCHN1Exm3Ha7%2BNLqKBVujkHZgTpsLx%2BVmbsCfiA1QU%2F4u4SYABx8w%2BmTKZxGot1iNZOmak8hLSRDeDPBljssxfCQ%2F6XqoI1phdryb9kZSmLzI4379%2FwYq5W3OuTG64n1QQx6mtLQeVgUzf6%2FUqq%2Fdh%2FMktPhbeNIJLIJLHFa7VLyY%2Bih8CIEDMjm9tCHc1o5KHAn%2B5%2B00pJE2lmmymXdROr%2FXZsbJ8jw9ZaaQLFGB1acM2ztEw2URSpxkEBc6aoXnoXJmo"
        var wsURI = 'wss://stream.watsonplatform.net/speech-to-text/api/v1/recognize?watson-token=' + token + '&model=es-ES_BroadbandModel';
        let websocket = new WebSocket(wsURI);
        websocket.onopen = function onOpen(evt){
          var message = {
            'action': 'start',
            'content-type': 'audio/l16;rate=22050'
          }
          websocket.send(JSON.stringify(message));
        }
        debugger
        websocket.onclose = function(evt) { onClose(evt) };
        websocket.onmessage = function(evt) { onMessage(evt) };
        websocket.onerror = function(evt) { onError(evt) };
        debugger
        websocket.send(blob)
        debugger
        // $.ajax({
        //   url: "https://stream.watsonplatform.net/speech-to-text/api/v1/recognize?watson-token="+ token,
        //   method: "POST",
        //   data: blob,
        //   contentType: "audio/ogg;codecs=opus"
        // }).done(function(response){
        //   console.log(response)
        // })
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
          }, 10000)
        }
      })
    }, function(error) {
      console.warn(error)
    })
  }

  render(){
    return(
      <div>
        <button id="playcord" className="btn btn-primary btn-lg" onClick={this.handleClick.bind(this)}>Start Recording</button>
        <div id="audiocontainer"></div>
      </div>
    )
  }

}
