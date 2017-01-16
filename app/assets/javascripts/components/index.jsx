class Index extends React.Component {


  render(){

    return(
      <div>

        <div className="container">
            <AudioVisualizer  />
          <div className="starter-template container-padding">

            <div>
            <h1>Just Press Start.</h1>
            <a href="#textAnalyzer"><p>You can also analyze text(below)</p></a>
            <WebSpeech currentUser={this.props.current_user} />

            </div>
            <div id="textAnalyzer">
              <h1>Text Analysis</h1>
              <TextForm currentUser={this.props.current_user} />
            </div>
          </div>

        </div>
      </div>
    )
  }
}
