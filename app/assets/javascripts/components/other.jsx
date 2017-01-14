class Other extends React.Component {

  handleClick(e) {
    e.preventDefault()
    $.ajax({
      url: '/results',
      method: 'post',
      data: ""
    }).done(function(r) {
      console.log(r)
    })
  }

  render() {
    return (
      <button className="something" onClick={this.handleClick.bind(this)} >Another</button>
    )
  }
}
