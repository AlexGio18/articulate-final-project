class History extends React.Component {

  componentDidMount() {
    let url = window.location.pathname
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
      <div className="container">
        <h1> Hey There </h1>
        <ul>
          {this.state.history.map((result, i) =>
            <Result result={result} key={result.id} />
          )}
        </ul>
      </div>
    )
  }
}
