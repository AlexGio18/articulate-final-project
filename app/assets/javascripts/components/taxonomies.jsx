class Taxonomies extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div id="taxonomies-container" className="result-box-sm results-color">
      <h3 className="results-header">Heirachy</h3>
        {this.props.taxonomies.map( (taxonomy, i) =>
          <Taxonomy taxonomy={taxonomy} key={i} />
        )}
      </div>
    )
  }
}
