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
    let ctx = document.getElementById("radarChart").getContext("2d");
    let gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(0,0,0,1)');
      gradient.addColorStop(1, 'rgba(250,174,50,0)');
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
            data: [this.state.resultData.doc_emotion.anger * 100, this.state.resultData.doc_emotion.disgust * 100, this.state.resultData.doc_emotion.fear * 100, this.state.resultData.doc_emotion.joy * 100,this.state.resultData.doc_emotion.sadness * 100]
        },
        {
            backgroundColor: gradient,
            // borderColor: "rgba(179,181,198,1)",
            // pointBackgroundColor: "rgba(179,181,198,1)",
            // pointBorderColor: "#fff",
            // pointHoverBackgroundColor: "#fff",
            // pointHoverBorderColor: "rgba(179,181,198,1)",
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
      <div className="radar-chart container"><canvas id="radarChart"></canvas></div>
    )
  }
}
