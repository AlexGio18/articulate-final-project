class FillerWord extends React.Component {


  render() {
    return(
      <div class="filler-word">
        <p>Word: {this.props.filler.word}, Count: {this.props.filler.count}</p>
      </div>
    )
  }

}
