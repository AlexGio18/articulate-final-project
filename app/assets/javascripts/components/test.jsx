class Test extends React.Component {

  handleClick(e) {
    e.preventDefault()
    $.ajax({
      url: '/get_token',
      method: 'get',
      dataType: 'json'
    }).done(function(r) {
      window.localStorage.setItem("watsonToken", r.token)
  }

  render() {
    return (
      <button className="anything" onClick={this.handleClick.bind(this)} />
    )
  }
}
