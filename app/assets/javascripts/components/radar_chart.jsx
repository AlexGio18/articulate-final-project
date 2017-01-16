class RadarChart extends React.Component {
  constructor() {
    super();
    this.state = {
      resultData: {}
    }

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
        console.log(response)
      })

      that.renderRadarChart()
  }

  renderRadarChart(){
    let ctx = document.getElementById("radarChart").getContext("2d");
    let radarData = {
    labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
    datasets: [
        {
            label: "My First dataset",
            backgroundColor: "rgba(179,181,198,0.2)",
            borderColor: "rgba(179,181,198,1)",
            pointBackgroundColor: "rgba(179,181,198,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(179,181,198,1)",
            data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            pointBackgroundColor: "rgba(255,99,132,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255,99,132,1)",
            data: [28, 48, 40, 19, 96, 27, 100]
        }
    ]
};
      let myPieChart = new Chart(ctx, {
            type: 'radar',
            data: radarData
          })
  }

  render(){

    return(
      <canvas className="radar-chart" id="radarChart"></canvas>
    )
  }
}
