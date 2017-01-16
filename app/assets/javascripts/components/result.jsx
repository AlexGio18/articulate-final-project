class Result extends React.Component {

  render(){

    let {transcript, created_at, id} = this.props.result
    return(
      <a href={window.location.pathname+ "/"+ id} className="results-stylings onhover"><div className="result-history"><p>{transcript}</p>
          <p>{created_at}</p></div></a>

    )
  }

}
