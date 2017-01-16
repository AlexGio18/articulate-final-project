class Taxonomy extends React.Component {
  render() {
    return(
      <div className="taxonomy">
        <h4>label: {this.props.taxonomy.label}</h4>
        <p>score: {this.props.taxonomy.score}</p>
        <p>confident: {this.props.taxonomy.confident}</p>
      </div>
    )
  }
}
