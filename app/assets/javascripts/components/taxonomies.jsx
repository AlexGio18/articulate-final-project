class Taxonomies extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div id="taxonomies-container">
        <h3>Taxonomies:</h3>
        {this.props.taxonomies.map( (taxonomy, i) =>
          <Taxonomy taxonomy={taxonomy} key={i} />
        )}
      </div>
    )
  }
}
