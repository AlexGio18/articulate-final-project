class Errors extends React.Component{
  render(){
    return(
    <div>
      <a href="/"> Try Again! </a>
      <div className="alert alert-danger">
        <strong>Hey You!</strong> Sorry but we didn't catch what you said. Make sure your microphone is being allowed and try again.
      </div>
    </div>
    )
  }
}
