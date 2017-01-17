class Taxonomies extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div id="taxonomies-container">
        {this.props.taxonomies.map( (taxonomy, i) =>
          <Taxonomy taxonomy={taxonomy} key={i} />
        )}
      </div>
    )
  }
}
