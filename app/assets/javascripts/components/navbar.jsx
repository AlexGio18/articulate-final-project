class NavBar extends React.Component {

  render() {
    return(
      <nav className="navbar navbar-inverse navbar-fixed-top white-opacity">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar" >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Project name</a>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li className="onhover"><a href="/users/sign_in">Login</a></li>
              <li className="onhover"><a href="/users/sign_up">Register</a></li>
              <li className="onhover"><a href="/users/1">Home</a></li>
            </ul>
          </div>
        </div>
      </nav>

    )
  }
}
