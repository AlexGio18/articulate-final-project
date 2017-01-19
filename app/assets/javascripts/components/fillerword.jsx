class FillerWord extends React.Component {


  render() {
    return(
      <div className="filler-word">
        <p>Word: <span className="red-flag">{this.props.filler.word}</span>, Count: {this.props.filler.count}</p>
      </div>
    )
  }

}
