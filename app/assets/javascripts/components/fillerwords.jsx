class FillerWords extends React.Component {
  render() {
    return (
      <div className="result-box-sm">
        <h3 className="results-header" id="blue-header">Filler words</h3>

      {(this.props.fillers.length == 0) && <p>You didn't use any filler words</p>}

        {this.props.fillers.map( (filler, i) =>
          <FillerWord filler={filler} key={i} />)}

      </div>
    )
  }
}
