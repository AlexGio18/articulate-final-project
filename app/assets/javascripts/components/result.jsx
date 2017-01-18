class Result extends React.Component {
  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event){
    localStorage.setItem("speechId", this.refs.href.id)
  }

  render(){

    let {transcript, created_at, id} = this.props.result

    return(
      <a href={window.location.pathname+ "/"+ id} ref="href" id={id} onClick={this.handleClick} className="results-stylings onhover"><div className="result-history"><p>{transcript}</p>
          <p>Created At: {created_at.slice(0,10)}</p></div></a>

    )
  }

}
