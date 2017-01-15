class SpeechText extends React.Component{
  constructor(){
    super()
    this.state = {
      speech: "",
    }
  }
  componentDidMount(){
    var that = this
    $.ajax({
      url: '/users/1/speech_results/1',
      dataType: "json"
    }).done(function(response){
      that.setState({
        speech: response.text.text
      })
    })
  }
  render(){
    return(
      <p>{this.state.speech}</p>
    )
  }
}
