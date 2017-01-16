class Index extends React.Component {
  
  render(){

    return(
      <div>

        <div className="container">

          <div className="starter-template container-padding">
            <h1>Just Press Start.</h1>
            <WebSpeech currentUser={this.props.current_user} />
            <AudioVisualizer />
            <TextForm currentUser={this.props.current_user} />

          </div>

        </div>
      </div>
    )
  }
}
