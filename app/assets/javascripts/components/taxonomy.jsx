class Taxonomy extends React.Component {
  render() {
    return(
      <div className="taxonomy">
        <h4>{this.props.taxonomy.label}</h4>
        <p>score: {this.props.taxonomy.score}</p>
      </div>
    )
  }
}
