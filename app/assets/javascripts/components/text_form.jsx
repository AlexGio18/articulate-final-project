class TextForm extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 'You can also directly input the transcript of your speech here.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    const textBox = this.refs.textBox;
    event.preventDefault();

    let transcript = textBox.value
    let userId = this.props.currentUser.id
    console.log(textBox.value)
    $.ajax({
      url: "/users/"+userId+"/speech_results",
      method: 'post',
      data: "text="+transcript
    }).done(function(response){
      console.log(response)
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              Text:
            </label>
          </div>
          <textarea rows="10" cols="100" value={this.state.value} ref='textBox' onChange={this.handleChange} />
          <div>
            <input type="submit" value="Analyze" />
          </div>
        </form>
      </div>
    )
  }
}
