import React, {PropTypes} from 'react'
// import d3 from 'd3'

export default class StixGraph extends React.Component {

  constructor (props) { // LEARN: constructor called every time class is instantiated
    super(props) // LEARN: calls the parent's constructor
    this.mycustomfunction(props) // LEARN: must define custom functions in constructor
    console.log('CONSTRUCTOR stixgraph STATE', this.state)
    console.log('CONSTRUCTOR stixgraph PROPS', this.props)
  }

  mycustomfunction (stuff) {
    console.log('Im a custom function' + stuff)
  }

  componentWillMount () { // LEARN: react lifecycle function called JUST BEFORE rendering
    this.mycustomfunction('a')
  }

  render () {
    let graphWidth = this.props.graphWidth
    let graphHeight = this.props.graphHeight
    return (
      <div id='StixGraph'>
        <p> I am a graph of the stix ontology </p>
        <svg width={graphWidth} height={graphHeight} viewBox="300 408 1211 388" id="entities" >
          <g id="Entities" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(300.000000, 408.000000)">
            <path id="IND" className="stixEntity" d="M476.67,93.9 C476.67,98.33 480.25,101.9 484.67,101.9 L571.44,101.9 C575.84,101.9 579.44,98.33 579.44,93.9 L579.44,8.34 C579.44,3.92 575.84,0.34 571.44,0.34 L484.67,0.34 C480.25,0.34 476.67,3.92 476.67,8.34 L476.67,93.9 Z"></path>
            <path id="CMP" className="stixEntity" d="M315.76,379.15 C315.76,383.57 319.34,387.15 323.76,387.15 L410.53,387.15 C414.95,387.15 418.53,383.57 418.53,379.15 L418.53,293.58 C418.53,289.18 414.95,285.58 410.53,285.58 L323.76,285.58 C319.34,285.58 315.76,289.18 315.76,293.58 L315.76,379.15 Z"></path>
            <path id="ACT" className="stixEntity" d="M0.35,379.15 C0.35,383.57 3.95,387.15 8.35,387.15 L95.12,387.15 C99.54,387.15 103.12,383.57 103.12,379.15 L103.12,293.58 C103.12,289.18 99.54,285.58 95.12,285.58 L8.35,285.58 C3.95,285.58 0.35,289.18 0.35,293.58 L0.35,379.15 Z"></path>
            <path id="INC" className="stixEntity" d="M792,93.9 C792,98.33 795.57,101.9 800,101.9 L886.76,101.9 C891.18,101.9 894.76,98.33 894.76,93.9 L894.76,8.34 C894.76,3.92 891.18,0.34 886.76,0.34 L800,0.34 C795.57,0.34 792,3.92 792,8.34 L792,93.9 Z"></path>
            <path id="EXP" className="stixEntity" d="M946.57,380 C946.57,384.42 950.15,388 954.57,388 L1041.34,388 C1045.76,388 1049.34,384.42 1049.34,380 L1049.34,294.43 C1049.34,290.01 1045.76,286.43 1041.34,286.43 L954.57,286.43 C950.15,286.43 946.57,290.01 946.57,294.43 L946.57,380 Z"></path>
            <path id="COA" className="stixEntity" d="M1107.3,93.9 C1107.3,98.33 1110.9,101.9 1115.3,101.9 L1202.08,101.9 C1206.5,101.9 1210.08,98.33 1210.08,93.9 L1210.08,8.34 C1210.08,3.92 1206.5,0.34 1202.08,0.34 L1115.31,0.34 C1110.91,0.34 1107.31,3.92 1107.31,8.34 L1107.3,93.9 Z"></path>
            <path id="TTP" className="stixEntity" d="M631.16,380 C631.16,384.42 634.76,388 639.16,388 L725.93,388 C730.35,388 733.93,384.42 733.93,380 L733.93,294.43 C733.93,290.01 730.35,286.43 725.93,286.43 L639.16,286.43 C634.76,286.43 631.16,290.01 631.16,294.43 L631.16,380 Z"></path>
            <path id="OBS" className="stixEntity" d="M161.34,93.9 C161.34,98.33 164.92,101.9 169.34,101.9 L256.11,101.9 C260.54,101.9 264.11,98.33 264.11,93.9 L264.11,8.34 C264.11,3.92 260.54,0.34 256.11,0.34 L169.35,0.34 C164.93,0.34 161.35,3.92 161.35,8.34 L161.34,93.9 Z"></path>
          </g>
        </svg>
      </div>
    )
  }
}

StixGraph.propTypes = {
  data: PropTypes.array,
  graphSize: PropTypes.number,
  graphWidth: PropTypes.number,
  graphHeight: PropTypes.number
}
