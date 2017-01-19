class GetResults extends React.Component {
  constructor(){
    super();
    this.state = {
      resultData: []
    }

    this.getResultData = this.getResultData.bind(this)
  }

  getResultData(response){
    this.setState({
      resultData: response
    })
  }

  componentDidMount(){
    $.ajax({
      url: '/users/'+ this.props.current_user.id + '/speech_results/'+ this.props.result_data.id
    }).done(this.getResultData)

  }


  render(){
    return(
      <div className="starter-template container-padding">
        <div className="wrapper">
          {this.state.resultData.transcript && <ResultsShow result_data={this.state.resultData} current_user={this.props.current_user}/>}
        </div>
      </div>
      )
  }
}
