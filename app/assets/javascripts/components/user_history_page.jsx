class History extends React.Component {
  constuctor(){
    this.state = {
      history: []
    }
  }

  componentDidMount() {
    let userID = this.props.current_user.id
    $.ajax({
      url: url,
      method: 'GET'
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
        <ul>
          {/* {this.state.history.map((result, i) =>
            <Result result={result} key={result.id} />
          )} */}
        </ul>
      </div>
    )
  }
}
