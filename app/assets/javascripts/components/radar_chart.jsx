class RadarChart extends React.Component {
  constructor() {
    super();
    this.state = {
      resultData: {}
    }
    this.getResultData = this.getResultData.bind(this)
    this.renderRadarChart = this.renderRadarChart.bind(this)
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
        that.renderRadarChart(that.state)
      })

  }

  renderRadarChart(data){
    let canvas = document.getElementById("background-gradient");
    let ctxGradient = canvas.getContext("2d");

    let backgroundGradient = ctxGradient.createRadialGradient(100,100,100,100,100,0);
    backgroundGradient.addColorStop(0,"white");
    backgroundGradient.addColorStop(1,"green");
    ctxGradient.fillStyle = backgroundGradient;
    ctxGradient.fillRect(0,0,200,200);

    let ctx = document.getElementById("radarChart").getContext("2d");
    let gradient = ctx.createRadialGradient(75,50,5,90,60,100);
      gradient.addColorStop(0,"red");
      gradient.addColorStop(1,"white");
    let radarData = {
    labels: ["Anger", "Disgust", "Fear", "Joy", "Sadness"],
    datasets: [
        {
            label: "My First dataset",
            backgroundColor: "rgba(179,181,198,0.2)",
            borderColor: "rgba(179,181,198,1)",
            pointBackgroundColor: "rgba(179,181,198,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(179,181,198,1)",
            data: [this.state.resultData.doc_emotion.anger * 100, this.state.resultData.doc_emotion.disgust * 100, this.state.resultData.doc_emotion.fear * 100,
              (this.state.resultData.doc_emotion.joy * 100).toFixed(2),
              (this.state.resultData.doc_emotion.sadness * 100).toFixed(2)]
        },
        {
            backgroundColor: gradient,
            data: [90, 90, 90, 90, 90]
        },
    ]
};
      let myPieChart = new Chart(ctx, {
            type: 'radar',
            data: radarData
          })
  }

  render(){

    return(
      <div className="radar-chart container"><canvas id="background-gradient"></canvas><canvas id="radarChart"></canvas></div>
    )
  }
}
