class Result extends React.Component {

  render(){

    let {transcript, created_at} = this.props.result
    return(
      <a href={window.location.pathname} className="results-stylings onhover"><div className="result-history"><p>{transcript}</p>
          <p>{created_at}</p></div></a>

    )
  }

}
