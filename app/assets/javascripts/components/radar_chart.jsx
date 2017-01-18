class RadarChart extends React.Component {
  constructor() {
    super();
    this.state = {
      keywordCount: [],
    }
    // this.filterKeyWords = this.filterKeyWords.bind(this)
    this.renderRadarChart = this.renderRadarChart.bind(this)
  }

  // filterKeyWords(){
  //   let keywords = this.props.keywords.filter(function(keyword){
  //   return (keyword.relevance >= 0.817)
  //   })
  //   return keywords.slice(0,3)
  // }

  componentDidMount(){
    this.renderRadarChart()
  }

  



    // let backgroundGradient = ctxGradient.createRadialGradient(100,100,100,100,100,0);
    // backgroundGradient.addColorStop(0,"white");
    // backgroundGradient.addColorStop(1,"green");
    // ctxGradient.fillStyle = backgroundGradient;
    // ctxGradient.fillRect(0,0,200,200);
  renderRadarChart() {
      debugger
      let ctx = document.getElementById("radarChart").getContext("2d");
      // let gradient = ctx.createRadialGradient(75,50,5,90,60,100);
      //   gradient.addColorStop(0,"red");
      //   gradient.addColorStop(1,"white");
      
      let radarData = {
      labels: ["Anger", "Fear", "Joy", "Sadness", "Disgust"],
      datasets: [
          {
              label: this.props.keywords[0].text,
              backgroundColor: "rgba(90, 168, 90,0.2)",
              borderColor: "rgba(90, 168, 90, 1)",
              pointBackgroundColor: "rgba(90, 168, 90, 1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(90, 168, 90,1)",
              data: [ (this.props.keywords[0].keyword_emotion.anger * 100).toFixed(2), 
                      (this.props.keywords[0].keyword_emotion.fear * 100).toFixed(2), 
                      (this.props.keywords[0].keyword_emotion.joy * 100).toFixed(2),
                      (this.props.keywords[0].keyword_emotion.sadness * 100).toFixed(2), 
                      (this.props.keywords[0].keyword_emotion.disgust * 100).toFixed(2)
                    ]
          },
          {
              label: this.props.keywords[1].text,
              backgroundColor: "rgba(229, 35, 63, 0.2)",
              borderColor: "rgba(229, 35, 63, 1)",
              pointBackgroundColor: "rgba(229, 35, 63, 1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(229, 35, 63, 1)",
              data: [ (this.props.keywords[1].keyword_emotion.anger * 100).toFixed(2), 
                      (this.props.keywords[1].keyword_emotion.fear * 100).toFixed(2), 
                      (this.props.keywords[1].keyword_emotion.joy * 100).toFixed(2),
                      (this.props.keywords[1].keyword_emotion.sadness * 100).toFixed(2), 
                      (this.props.keywords[1].keyword_emotion.disgust * 100).toFixed(2)
                    ]
          },
          {
              label: this.props.keywords[2].text,
              backgroundColor: "rgba(49, 137, 175, 0.2)",
              borderColor: "rgba(49, 137, 175, 1)",
              pointBackgroundColor: "rgba(49, 137, 175, 1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(49, 137, 175, 1)",
              data: [ (this.props.keywords[2].keyword_emotion.anger * 100).toFixed(2), 
                      (this.props.keywords[2].keyword_emotion.fear * 100).toFixed(2), 
                      (this.props.keywords[2].keyword_emotion.joy * 100).toFixed(2),
                      (this.props.keywords[2].keyword_emotion.sadness * 100).toFixed(2), 
                      (this.props.keywords[2].keyword_emotion.disgust * 100).toFixed(2)
                    ]
          },
      ]};

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
