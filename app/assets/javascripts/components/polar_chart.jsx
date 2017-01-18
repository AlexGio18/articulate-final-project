class PolarChart extends React.Component {
  constructor() {
    super();
    this.state = {
      resultData: {}
    }
    this.getResultData = this.getResultData.bind(this)
    this.renderPolarChart = this.renderPolarChart.bind(this)
  }

  getResultData(response){
    this.setState({
      resultData: response
    })
  }

  componentDidMount(){
    let that = this
    $.ajax({
        url: "/json_test",
        method: "GET"
        // data: $.param(data)
      }).done(function(response){
        that.getResultData(response)
        that.renderPolarChart(that.state)
      })

  }
  renderPolarChart(data){
    // let canvas = document.getElementById("background-gradient");
    // let chartBackgroundColor = canvas.getContext("2d");
    // let opacity = this.state.resultData.keywords.sentiment_score
    // chartBackgroundColor.fillStyle = 'rgba(127,127,127)'
    // chartBackgroundColor.opacity = opacity;
    // chartBackgroundColor.fill

    let ctx = document.getElementById("polarChart").getContext("2d");
    let opacity = 0.5 + this.state.resultData.keywords[0].sentiment_score
    ctx.fillStyle = 'blue'; 
    // 'rgba(0, 0, 0, '+opacity+')'
    // ctx.fill();

    debugger
    // ctx.style.backgroundColor = 'rgba(0, 0, 0, '+opacity+')'
    // let chartBackgroundColor = ctx;
    // chartBackgroundColor.fillStyle = 'rgba(127,127,127'+opacity+')'
    // chartBackgroundColor.fill

    let polarData = {
        datasets: [{
          data: [
            this.state.resultData.doc_emotion.anger * 100,
            this.state.resultData.doc_emotion.joy * 100,
            this.state.resultData.doc_emotion.disgust * 200,
            this.state.resultData.doc_emotion.sadness * 100,
            this.state.resultData.doc_emotion.fear * 200
          ],
          backgroundColor: [
            "#E5233F",
            "#FFFC59",
            "#a0d6b4",
            "#36A2EB",
            "#7A7AF5"
        ],
        label: 'My dataset'
      }],
      labels: [
        "Anger",
        "Joy",
        "Disgust",
        "Sadness",
        "Fear"
    ]
};

      let myPieChart = new Chart(ctx, {
            type: 'polarArea',
            backgroundColor: 'rgba(0, 0, 0, .5)',
            data: polarData
          })
  }
  render(){

    return(
      <div className="radar-chart container"><canvas id="background-gradient"></canvas><canvas id="polarChart"></canvas></div>
    )
  }
}
