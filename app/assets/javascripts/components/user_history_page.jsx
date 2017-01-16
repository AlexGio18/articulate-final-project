class History extends React.Component {

  constructor(){
    super();

    this.state = {
      history: []
    }

    this.getHistory = this.getHistory.bind(this)
  }

  componentDidMount() {
    let userID = this.props.current_user.id
    $.ajax({
      url: "/users/"+userID+"/speech_results"
    }).done(this.getHistory)
  }

  getHistory(response) {
    this.setState({
      history: response
    })
  }

  render(){

    return (
      <div className="starter-template container-padding">
        <h1>Your History</h1>
        <div>
          {this.state.history.map((result, i) =>
            <Result result={result} key={i} />
          )}
        </div>
      </div>
    )
  }
}
