import React, {PropTypes} from 'react'
import * as _ from 'lodash'

// import d3 from 'd3'

export default class StixGraph extends React.Component {

  constructor (props) { // LEARN: constructor called every time class is instantiated
    super(props) // LEARN: calls the parent's constructor
    this._parseData(props) // LEARN: must define custom functions in constructor
    this._filterNodes(props)
    // console.log('CONSTRUCTOR stixgraph STATE', this.state)
    // console.log('CONSTRUCTOR stixgraph PROPS', this.props)
  }

  _parseData (data) {
    console.log('STIX GRAPH PARSING DATA')

    // get node types
    var vertices = _.uniqBy(data, 'vertexType') // returns array of objects
    vertices = [...new Set(vertices.map(item => item.vertexType))] // returns only the vertexType values
    vertices = _.without(vertices, '', ' ', null, undefined)
    console.log('VERTEX TYPES IN FILE', vertices)

    // get an array for each node type
    var nodesAddressRange = this._filterNodes(data, 'AddressRange')
    var nodesExploit = this._filterNodes(data, 'Exploit')
    var nodesIP = this._filterNodes(data, 'IP')
    var nodesMalware = this._filterNodes(data, 'Malware')
    var nodesVulnerability = this._filterNodes(data, 'Vulnerability')
    var nodesWeakness = this._filterNodes(data, 'Weakness')
    var nodesCampaign = this._filterNodes(data, 'Campaign')
    var nodesCourseOfAction = this._filterNodes(data, 'Course_Of_Action')
    var nodesExploitTarget = this._filterNodes(data, 'Exploit_Target')
    var nodesIncident = this._filterNodes(data, 'Incident')
    var nodesIndicator = this._filterNodes(data, 'Indicator')
    var nodesThreatActor = this._filterNodes(data, 'Threat_Actor')
    var nodesTTP = this._filterNodes(data, 'TTP')
    var nodesObservable = this._filterNodes(data, 'Observable')

    console.log('node lengths by type',
      'AddressRanges : ', nodesAddressRange.length,
      'Exploits : ', nodesExploit.length,
      'IPs : ', nodesIP.length,
      'Malwares : ', nodesMalware.length,
      'Vulnerabilitys : ', nodesVulnerability.length,
      'Weaknesss : ', nodesWeakness.length,
      'Campaigns : ', nodesCampaign.length,
      'Course_Of_Actions : ', nodesCourseOfAction.length,
      'Exploit_Targets : ', nodesExploitTarget.length,
      'Incidents : ', nodesIncident.length,
      'Indicators : ', nodesIndicator.length,
      'Threat_Actors : ', nodesThreatActor.length,
      'TTPs : ', nodesTTP.length,
      'Observables : ', nodesObservable.length)
  }

  _filterNodes (data, nodeType) { // RETURNS AN ARRAY OF ENTITIES WITH ONLY STATED VERTEX TYPE
    var nodes = _.filter(data, function (item) {
      return item.vertexType === nodeType
    })
    return nodes
  }

  componentWillMount () { // LEARN: react lifecycle function called JUST BEFORE rendering
    this._parseData(this.props.data)
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
          <g id="Labels" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(323.000000, 451.000000)" fontSize="12" fontFamily="AvenirNext-Bold, Avenir Next" fontWeight="bold">
            <text id="OBSCount" fill="#4A4A4A">
              <tspan x="164" y="12">number</tspan>
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
