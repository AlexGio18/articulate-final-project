class BubbleChart extends React.Component {


  handleChartDisplay (event) {
    if($(event.target).context.innerHTML === " Social "){
      var chart = new CanvasJS.Chart("chartContainer",
        {
      axisY: {
  			valueFormatString: " ",
  		},
  		axisX: {
  			valueFormatString: " ",
  		},
       data: [
       {
         type: "bubble",
         showInLegend: false,
         toolTipContent: "<span style='\"'color: {color};'\"'><strong>{name}</strong></span><br/><strong>Confidency: {score}</strong><br/>",
         dataPoints: [
           { x: 9, y: 5, z:this.state.social_tone["agreeableness"]*100, name: "Openness", color: "#5AA85A", score: this.state.social_tone["agreeableness"] },
           { x: 11, y: 20, z:this.state.social_tone["conscientiousness"]*100, name: "Conscientiousness", color: "#5AA85A",score: this.state.social_tone["conscientiousness"] },
           { x: 5, y: 4, z:this.state.social_tone["emotional_range"]*100, name: "Extraversion", color: "#5AA85A", score: this.state.social_tone["emotional_range"] },
           { x: 14, y: 26, z:this.state.social_tone["extraversion"]*100, name: "Agreeableness", color: "#5AA85A", score: this.state.social_tone["extraversion"] },
           { x: 20, y: 4, z:this.state.social_tone["openness"]*100, name: "Emotional Range", color: "#5AA85A", score: this.state.social_tone["openness"] }
          ]
        }
        ]
      });
      chart.render();
    }
    else if ($(event.target).context.innerHTML === " Emotional ") {
      var chart = new CanvasJS.Chart("chartContainer",
        {
      axisY: {
  			valueFormatString: " ",
  		},
  		axisX: {
  			valueFormatString: " ",
  		},
       data: [
       {
         type: "bubble",
         showInLegend: false,
         toolTipContent: "<span style='\"'color: {color};'\"'><strong>{name}</strong></span><br/><strong>Confidency: {score}</strong><br/>",
         dataPoints: [
           { x: 16, y: 25, z:this.state.emotion_tone["anger"]*100, name: "Anger", color: "#E5233F", score: this.state.emotion_tone["anger"] },
           { x: 19, y: 17, z:this.state.emotion_tone["disgust"]*100, name: "Disgust", color: "#E5233F", score:this.state.emotion_tone["disgust"] },
           { x: 15, y: 10, z:this.state.emotion_tone["fear"]*100, name: "Fear", color: "#E5233F", score: this.state.emotion_tone["fear"] },
           { x: 18, y: 6, z:this.state.emotion_tone["joy"]*100, name: "Joy", color: "#E5233F", score: this.state.emotion_tone["joy"] },
           { x: 7, y: 12, z:this.state.emotion_tone["sadness"]*100, name: "Sadness", color: "#E5233F", score:this.state.emotion_tone["sadness"] }
          ]
        }
        ]
      });
      chart.render();
    }

    else if ($(event.target).context.innerHTML === " Language "){
      var chart = new CanvasJS.Chart("chartContainer",
        {
      axisY: {
  			valueFormatString: " ",
  		},
  		axisX: {
  			valueFormatString: " ",
  		},
       data: [
       {
         type: "bubble",
         showInLegend: false,
         toolTipContent: "<span style='\"'color: {color};'\"'><strong>{name}</strong></span><br/><strong>Confidency: {score}</strong><br/>",
         dataPoints: [
           { x: 10, y: 14, z:this.state.language_tone["analytical"]*100, name: "Analytical", color: "#3189AF", score:this.state.language_tone["analytical"] },
           { x: 5, y: 20, z:this.state.language_tone["confident"]*100, name: "Confident", color: "#3189AF", score: this.state.language_tone["confident"] },
           { x: 12, y: 10, z:this.state.language_tone["tentative"]*100, name: "Tentative", color: "#3189AF", score: this.state.language_tone["tentative"]}
          ]
        }
        ]
      });
      chart.render();
    }
  else if ($(event.target).context.innerHTML === " All ") {
      this.createChartAll()
    }
  }

  constructor(){
    super();
    this.state = {
        emotion_tone: [],
        language_tone: [],
        social_tone: [],
        data: [],
    }
    this.handleChartDisplay = this.handleChartDisplay.bind(this)
    this.createChartAll = this.createChartAll.bind(this)
  }

  componentDidMount(){
    var that = this
    $.ajax({
      url: '/json_test',
      dataType: "json"
    }).done(function(response){
      that.setState({
        emotion_tone: response.doc_emotion,
        language_tone: response.doc_language_tone,
        social_tone: response.doc_social_tone,
      })
        setTimeout(that.createChartAll, 0)
    })
  }

  createChartAll(){
    var chart = new CanvasJS.Chart("chartContainer",
      {
    axisY: {
			valueFormatString: " ",
		},
		axisX: {
			valueFormatString: " ",
		},
    //    zoomEnabled: true,
    //    animationEnabled: true,
    //    title:{
    //     text: "Fertility Rate Vs Life Expectancy in different countries - 2009"
    //   },
    //   axisX: {
    //    title:"Life Expectancy",
    //    minimim: 30
    //  },
    //  axisY: {
    //    title:"Fertility Rate"
     //
    //  },
     //
    //  legend:{
    //    verticalAlign: "bottom",
    //    horizontalAlign: "left"
     //
    //  },
     data: [
     {
       type: "bubble",
       showInLegend: false,
       toolTipContent: "<span style='\"'color: {color};'\"'><strong>{name}</strong></span><br/><strong>Confidency: {score}</strong><br/>",
       dataPoints: [

        { x: 16, y: 25, z:this.state.emotion_tone["anger"]*100, name: "Anger", color: "#E5233F", score: this.state.emotion_tone["anger"] },
        { x: 19, y: 17, z:this.state.emotion_tone["disgust"]*100, name: "Disgust", color: "#E5233F", score:this.state.emotion_tone["disgust"] },
        { x: 15, y: 10, z:this.state.emotion_tone["fear"]*100, name: "Fear", color: "#E5233F", score: this.state.emotion_tone["fear"] },
        { x: 18, y: 6, z:this.state.emotion_tone["joy"]*100, name: "Joy", color: "#E5233F", score: this.state.emotion_tone["joy"] },
        { x: 7, y: 12, z:this.state.emotion_tone["sadness"]*100, name: "Sadness", color: "#E5233F", score:this.state.emotion_tone["sadness"]},

        { x: 10, y: 14, z:this.state.language_tone["analytical"]*100, name: "Analytical", color: "#3189AF", score:this.state.language_tone["analytical"] },
        { x: 5, y: 20, z:this.state.language_tone["confident"]*100, name: "Confident", color: "#3189AF", score: this.state.language_tone["confident"] },
        { x: 12, y: 10, z:this.state.language_tone["tentative"]*100, name: "Tentative", color: "#3189AF", score: this.state.language_tone["tentative"]},

        { x: 9, y: 5, z:this.state.social_tone["agreeableness"]*100, name: "Openness", color: "#5AA85A", score: this.state.social_tone["agreeableness"] },
        { x: 11, y: 20, z:this.state.social_tone["conscientiousness"]*100, name: "Conscientiousness", color: "#5AA85A",score: this.state.social_tone["conscientiousness"] },
        { x: 5, y: 4, z:this.state.social_tone["emotional_range"]*100, name: "Extraversion", color: "#5AA85A", score: this.state.social_tone["emotional_range"] },
        { x: 14, y: 26, z:this.state.social_tone["extraversion"]*100, name: "Agreeableness", color: "#5AA85A", score: this.state.social_tone["extraversion"] },
        { x: 20, y: 4, z:this.state.social_tone["openness"]*100, name: "Emotional Range", color: "#5AA85A", score: this.state.social_tone["openness"] }
        ]
      }
      ]
    });

 chart.render();
 }

  render(){
    return(
      <div id="charts-container">
        <div>
          <table id= "chart-selection" onClick={this.handleChartDisplay}>
            <tbody>
              <td id="show-all"> All </td>
              <td id="emotion-chart"> Emotional </td>
              <td id="language-chart"> Language </td>
              <td id="social-chart"> Social </td>
            </tbody>
          </table>
        </div>
        <div id="chartContainer"></div>)
      </div>
    )
  }
}
