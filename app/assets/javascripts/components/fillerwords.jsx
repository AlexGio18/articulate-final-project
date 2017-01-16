class FillerWords extends React.Component {
  render() {
    return (
      <div class="fillers-container">
        <h3>Filler words</h3>
        {this.props.fillers.map( (filler, i) =>
          <FillerWord filler={filler} key={i} />)}
      </div>
    )
  }
}
