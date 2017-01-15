class BubbleChart extends React.Component {
  constructor(){
    super();
    this.state = {
        emotion_tone: [],
        language_tone: [],
        social_tone: [],
        data: [],
    }

    this.dataRadii = this.dataRadii.bind(this)
    this.createChartAll = this.createChartAll.bind(this)
  }
  componentDidMount(){
    var that = this
    $.ajax({
      url: '/users/1/speech_results/1',
      dataType: "json"
    }).done(function(response){
      that.setState({
        emotion_tone: response.document_tone.tone_categories[0].tones,
        language_tone: response.document_tone.tone_categories[1].tones,
        social_tone: response.document_tone.tone_categories[2].tones,
      })
        setTimeout(that.dataRadii, 0)
    })
  }

  //calculates the radius values for all data to be plotted
  dataRadii(){
    radii_hash = {}
    let emotion_tone_scores = {}
    let language_tone_scores = {}
    let social_tone_scores = {}

    for (i = 0; i < this.state.emotion_tone.length; i++) {
      emotion_tone_scores[this.state.emotion_tone[i].tone_name +=" radius"]= ((this.state.emotion_tone[i].score)*100)
      social_tone_scores[this.state.social_tone[i].tone_name +=" radius"]= ((this.state.social_tone[i].score)*100)
    }
    for (i = 0; i < this.state.language_tone.length; i++) {
      language_tone_scores[this.state.language_tone[i].tone_name +=" radius"]= ((this.state.language_tone[i].score)*100)
    }
    radii_hash['emotion_radii'] = emotion_tone_scores
    radii_hash['language_radii'] =  language_tone_scores
    radii_hash['social_radii'] = social_tone_scores
    this.setState({
      data: radii_hash
    })
      setTimeout(this.createChartAll, 0)
  }

  createChartAll(){
    debugger
    var chart = new CanvasJS.Chart("chartContainer",
      {
    //    zoomEnabled: true,
    //    animationEnabled: true,
    //    title:{
    //     text: "Fertility Rate Vs Life Expectancy in different countries - 2009"
    //   },
    //   axisX: {
    //    title:"Life Expectancy",
    //    maximum: 30
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

        { x: 16, y: 25, z:this.state.data["emotion_radii"]["Anger radius"], name: "Anger", score: this.state.emotion_tone[0].score },
        { x: 19, y: 17, z:this.state.data["emotion_radii"]["Disgust radius"], name: "Disgust", score: this.state.emotion_tone[1].score },
        { x: 15, y: 10, z:this.state.data["emotion_radii"]["Fear radius"], name: "Fear", score: this.state.emotion_tone[2].score },
        { x: 18, y: 6, z:this.state.data["emotion_radii"]["Joy radius"], name: "Joy", score: this.state.emotion_tone[3].score },
        { x: 7, y: 12, z:this.state.data["emotion_radii"]["Sadness radius"], name: "Sadness", score: this.state.emotion_tone[4].score },

        { x: 10, y: 14, z:this.state.data["language_radii"]["Analytical radius"], name: "Analytical", score: this.state.language_tone[0].score },
        { x: 5, y: 20, z:this.state.data["language_radii"]["Confident radius"], name: "Confident", score: this.state.language_tone[1].score },
        { x: 12, y: 10, z:this.state.data["language_radii"]["Tentative radius"], name: "Tentative", score: this.state.language_tone[2].score },

        { x: 9, y: 5, z:this.state.data["social_radii"]["Openness radius"], name: "Openness", score: this.state.social_tone[0].score },
        { x: 11, y: 20, z:this.state.data["social_radii"]["Conscientiousness radius"], name: "Conscientiousness", score: this.state.social_tone[1].score },
        { x: 5, y: 4, z:this.state.data["social_radii"]["Extraversion radius"], name: "Extraversion", score: this.state.social_tone[2].score },
        { x: 14, y: 26, z:this.state.data["social_radii"]["Agreeableness radius"], name: "Agreeableness", score: this.state.social_tone[3].score },
        { x: 20, y: 4, z:this.state.data["social_radii"]["Emotional Range radius"], name: "Emotional Range", score: this.state.social_tone[4].score }
        ]
      }
      ]
    });

 chart.render();
 }

  render(){
    return(  <div id="chartContainer"></div>)
  }
}
