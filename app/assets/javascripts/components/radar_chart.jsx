class RadarChart extends React.Component {
  constructor() {
    super();
    this.state = {
      keywordCount: [],
    }
    this.checkKeywords = this.checkKeywords.bind(this)
  }

  componentWillMount(){
    this.checkKeywords()
  }

  componentDidMount(){

    if (this.props.keywords.length >= 3){
    this.renderRadarChart()
    }
    else if (this.props.keywords.length === 2){
      this.renderRadarTwoCharts()
    }
    else {
      this.renderRadarOneChart()
    }
  }

  checkKeywords(){
    debugger
    if (this.props.keywords && (this.props.keywords.length > 1)){
      debugger
    }

  }

  renderDataSet(){

   if (this.props.keywords[0]){
    return  {
              label: this.props.keywords[0].text,
              backgroundColor: "rgba(229, 35, 63, 0.2)",
              borderColor: "rgba(229, 35, 63, 1)",
              pointBackgroundColor: "rgba(229, 35, 63, 1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(229, 35, 63, 1)",
              data: [ (this.props.keywords[0].keyword_emotion.anger * 100).toFixed(2),
                      (this.props.keywords[0].keyword_emotion.fear * 100).toFixed(2),
                      (this.props.keywords[0].keyword_emotion.joy * 100).toFixed(2),
                      (this.props.keywords[0].keyword_emotion.sadness * 100).toFixed(2),
                      (this.props.keywords[0].keyword_emotion.disgust * 100).toFixed(2)
                    ]
            }
    }

  }

  renderDataSet2() {

    if (this.props.keywords[1]){
       return {
              label: this.props.keywords[1].text,
              backgroundColor: "rgba(49, 137, 175, 0.2)",
              borderColor: "rgba(49, 137, 175, 1)",
              pointBackgroundColor: "rgba(49, 137, 175, 1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(49, 137, 175, 1)",
              data: [ (this.props.keywords[1].keyword_emotion.anger * 100).toFixed(2),
                      (this.props.keywords[1].keyword_emotion.fear * 100).toFixed(2),
                      (this.props.keywords[1].keyword_emotion.joy * 100).toFixed(2),
                      (this.props.keywords[1].keyword_emotion.sadness * 100).toFixed(2),
                      (this.props.keywords[1].keyword_emotion.disgust * 100).toFixed(2)
                    ]
              }
        }
  }

  renderDataSet3(){

   if (this.props.keywords[2]){
    return  {
              label: this.props.keywords[2].text,
              backgroundColor: "rgba(90, 168, 90, 0.2)",
              borderColor: "rgba(90, 168, 90, 1)",
              pointBackgroundColor: "rgba(90, 168, 90, 1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(90, 168, 90, 1)",
              data: [ (this.props.keywords[2].keyword_emotion.anger * 100).toFixed(2),
                      (this.props.keywords[2].keyword_emotion.fear * 100).toFixed(2),
                      (this.props.keywords[2].keyword_emotion.joy * 100).toFixed(2),
                      (this.props.keywords[2].keyword_emotion.sadness * 100).toFixed(2),
                      (this.props.keywords[2].keyword_emotion.disgust * 100).toFixed(2)
                    ]
            }
    }

  }

  renderRadarChart() {
    let ctx = document.getElementById("radarChart").getContext("2d");

    let radarData = {
      labels: ["Anger", "Fear", "Joy", "Sadness", "Disgust"],
      datasets: [

          this.renderDataSet(),
          this.renderDataSet2(),
          this.renderDataSet3(),

      ]};

    let myPieChart = new Chart(ctx, {
      type: 'radar',
      data: radarData
    })
  }

  renderRadarTwoCharts() {
    let ctx = document.getElementById("radarChart").getContext("2d");

    let radarData = {
      labels: ["Anger", "Fear", "Joy", "Sadness", "Disgust"],
      datasets: [
        this.renderDataSet(),
        this.renderDataSet2(),
      ]}

    let myPieChart = new Chart(ctx, {
      type: 'radar',
      data: radarData
    })
  }

    renderRadarOneChart() {
      let ctx = document.getElementById("radarChart").getContext("2d");

      let radarData = {
      labels: ["Anger", "Fear", "Joy", "Sadness", "Disgust"],
      datasets: [
          this.renderDataSet()
      ]};

      let myPieChart = new Chart(ctx, {
        type: 'radar',
        data: radarData
      })

    }

  render(){

    return(
      <div className="radar-chart container">
      <h2 className="results-header">Keywords</h2>
      <canvas id="radarChart"></canvas>
      </div>
    )
  }
}
