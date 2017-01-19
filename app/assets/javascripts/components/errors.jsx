class Errors extends React.Component{
  render(){
    return(
    <div className="errors">

      <div className="alert alert-danger">
        <strong>Hey You!</strong> To offer meaningful feedback, our app requires more content than you supplied. Please try again!
      </div>

      <a className="try-again" href="/"> Try Again! </a>
    </div>
    )
  }
}
