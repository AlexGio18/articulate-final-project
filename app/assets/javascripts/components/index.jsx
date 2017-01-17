class Index extends React.Component {
  componentDidMount(){
    //hides audio and timer
  }


  render(){

    return(
      <div>
        <div className="starter-template container-padding">
          <div className="wrapper">
          <WebSpeech currentUser={this.props.current_user} />
          </div>
          <div id="textAnalyzer">
            <h1>Text Analysis</h1>
            <TextForm currentUser={this.props.current_user} />
          </div>
        </div>

      </div>
    )
  }
}
