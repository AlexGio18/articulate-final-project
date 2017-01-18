class FillerWords extends React.Component {
  render() {
    return (
      <div className="result-box-sm">
        <h3 className="results-header">Filler words</h3>
        {this.props.fillers.map( (filler, i) =>
          <FillerWord filler={filler} key={i} />)}
      </div>
    )
  }
}
