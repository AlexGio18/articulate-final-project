class TextForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const textBox = this.refs.textBox;
    event.preventDefault();
    $('#text_analyzer').slideUp('slow')
    $('.welcome').slideUp('slow')

    $( "<div class='loading'>Results are loading...</div>" ).appendTo('.wrapper')

    let transcript = textBox.value
    let userId = this.props.currentUser.id
    let data = {
      speech_result: {
        transcript: transcript,
        duration: 0,
        wpm: 0
      }
    }
    $.ajax({
      url: "/users/"+userId+"/speech_results",
      method: 'post',
      data: $.param(data)
    }).done(function(response){
      this.props.results(response)
      $('.loading').remove()
    }.bind(this))
    .error(function(errors) {
      $('.loading').remove()
      this.props.errorCheck("ERROR")
    }.bind(this))

  }


  render() {
    return (
      <div id="text_analyzer">
        <form onSubmit={this.handleSubmit}>
          <div>
          </div>
          <textarea rows="10" cols="100" ref='textBox' />
          <div>
            <input type="submit" className="btn btn-primary btn-lg record-button" value="Analyze" />
          </div>
        </form>
      </div>
    )
  }
}
