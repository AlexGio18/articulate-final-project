class ResultsShow extends React.Component{
  render(){
    return(
  <div>
    <div id="chart">
      <BubbleChart/>
    </div>
    <div id="speech-container">
      <div id="speech">
        <SpeechText/>
      </div>
    </div>
  </div>
    )
  }
}
