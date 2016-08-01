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
    // #TODO: replace paths with svg rectangles from sketch
    return (
      <div id='StixGraph'>
        <p> I am a graph of the stix ontology </p>
        <svg width={graphWidth} height={graphHeight} viewBox="300 408 1211 388" id="entities" >
          <g id="Entities" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(300.000000, 408.000000)">
            <rect id="OBS" x="163" y="0" width="100" height="100" rx="8"></rect>
            <rect id="IND" x="474" y="0" width="100" height="100" rx="8"></rect>
            <rect id="INC" x="793" y="0" width="100" height="100" rx="8"></rect>
            <rect id="COA" x="1107" y="0" width="100" height="100" rx="8"></rect>
            <rect id="EXP" x="945" y="282" width="100" height="100" rx="8"></rect>
            <rect id="TTP" x="629" y="282" width="100" height="100" rx="8"></rect>
            <rect id="CMP" x="312" y="282" width="100" height="100" rx="8"></rect>
            <rect id="ACT" x="0" y="282" width="100" height="100" rx="8"></rect>
          </g>
          <g id="Labels" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(323.000000, 451.000000)" font-size="12" font-family="AvenirNext-Bold, Avenir Next" font-weight="bold">
            <text id="OBSCount" fill="#4A4A4A">
              <tspan x="164" y="12">NUMBER</tspan>
            </text>
            <text id="INDCount" fill="#4A4A4A">
              <tspan x="479" y="12">NUMBER</tspan>
            </text>
            <text id="INCCount" fill="#4A4A4A">
              <tspan x="794" y="12">NUMBER</tspan>
            </text>
            <text id="COACount" fill="#4A4A4A">
              <tspan x="1109" y="12">NUMBER</tspan>
            </text>
            <text id="ACTCount" fill="#4A4A4A">
              <tspan x="0" y="298">NUMBER</tspan>
            </text>
            <text id="CMPCount" fill="#4A4A4A">
              <tspan x="315" y="298">NUMBER</tspan>
            </text>
            <text id="TTPCount" fill="#4A4A4A">
              <tspan x="630" y="298">NUMBER</tspan>
            </text>
            <text id="EXPCount" fill="#4A4A4A">
              <tspan x="945" y="298">NUMBER</tspan>
            </text>
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
