class Keywords extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div id="keywords-container">
        <h3>Keywords:</h3>
        {this.props.keywords.map( (keyword, i) =>
          <Keyword keyword={keyword} key={i} />
        )}

      </div>
    )
  }
}
