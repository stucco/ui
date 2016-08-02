import React, {PropTypes} from 'react'
import * as _ from 'lodash'
import StixNode from './StixNode.js'

// import d3 from 'd3'

export default class StixGraph extends React.Component {

  constructor (props) { // LEARN: constructor called every time class is instantiated
    super(props) // LEARN: calls the parent's constructor

    // stateful containers for each type of node
    this.state = {
      nodesObservable: [],
      nodesAddressRange: [],
      nodesExploit: [],
      nodesIP: [],
      nodesMalware: [],
      nodesVulnerability: [],
      nodesWeakness: [],
      nodesCampaign: [],
      nodesCourseOfAction: [],
      nodesExploitTarget: [],
      nodesIncident: [],
      nodesIndicator: [],
      nodesThreatActor: [],
      nodesTTP: []
    }

    this._parseData(props) // LEARN: must define custom functions in constructor
    this._filterNodes(props)
    this._getProps(props)
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
    this.state.nodesAddressRange = this._filterNodes(data, 'AddressRange')
    this.state.nodesExploit = this._filterNodes(data, 'Exploit')
    this.state.nodesIP = this._filterNodes(data, 'IP')
    this.state.nodesMalware = this._filterNodes(data, 'Malware')
    this.state.nodesVulnerability = this._filterNodes(data, 'Vulnerability')
    this.state.nodesWeakness = this._filterNodes(data, 'Weakness')
    this.state.nodesCampaign = this._filterNodes(data, 'Campaign')
    this.state.nodesCourseOfAction = this._filterNodes(data, 'Course_Of_Action')
    this.state.nodesExploitTarget = this._filterNodes(data, 'Exploit_Target')
    this.state.nodesIncident = this._filterNodes(data, 'Incident')
    this.state.nodesIndicator = this._filterNodes(data, 'Indicator')
    this.state.nodesThreatActor = this._filterNodes(data, 'Threat_Actor')
    this.state.nodesTTP = this._filterNodes(data, 'TTP')
    this.state.nodesObservable = this._filterNodes(data, 'Observable')

    console.log('node lengths by type',
      'AddressRanges : ', this.state.nodesAddressRange.length,
      'Exploits : ', this.state.nodesExploit.length,
      'IPs : ', this.state.nodesIP.length,
      'Malwares : ', this.state.nodesMalware.length,
      'Vulnerabilitys : ', this.state.nodesVulnerability.length,
      'Weaknesss : ', this.state.nodesWeakness.length,
      'Campaigns : ', this.state.nodesCampaign.length,
      'Course_Of_Actions : ', this.state.nodesCourseOfAction.length,
      'Exploit_Targets : ', this.state.nodesExploitTarget.length,
      'Incidents : ', this.state.nodesIncident.length,
      'Indicators : ', this.state.nodesIndicator.length,
      'Threat_Actors : ', this.state.nodesThreatActor.length,
      'TTPs : ', this.state.nodesTTP.length,
      'Observables : ', this.state.nodesObservable.length)
  }

  _filterNodes (data, nodeType) { // RETURNS AN ARRAY OF ENTITIES WITH ONLY STATED VERTEX TYPE
    var nodes = _.filter(data, function (item) {
      return item.vertexType === nodeType
    })
    return nodes
  }

  _getProps (nodeType) {
    var props = {}
    switch (nodeType) {
      case 'OBS':
        props = {
          xid: 'OBS',
          x: 163,
          y: 0,
          width: 100,
          height: 100,
          rx: 8,
          tx: 164,
          ty: 12,
          nodeLabel: this.state.nodesObservable.length
        }
        break
      case 'IND':
        props = {
          xid: 'IND',
          x: 474,
          y: 0,
          width: 100,
          height: 100,
          rx: 8,
          tx: 479,
          ty: 12,
          nodeLabel: this.state.nodesIndicator.length
        }
        break
      case 'INC':
        props = {
          xid: 'INC',
          x: 793,
          y: 0,
          width: 100,
          height: 100,
          rx: 8,
          tx: 794,
          ty: 12,
          nodeLabel: this.state.nodesIncident.length
        }
        break
      case 'COA':
        props = {
          xid: 'COA',
          x: 1107,
          y: 0,
          width: 100,
          height: 100,
          rx: 8,
          tx: 1109,
          ty: 12,
          nodeLabel: this.state.nodesCourseOfAction.length
        }
        break
      case 'EXP':
        props = {
          xid: 'EXP',
          x: 945,
          y: 282,
          width: 100,
          height: 100,
          rx: 8,
          tx: 945,
          ty: 298,
          nodeLabel: this.state.nodesExploitTarget.length

        }
        break
      case 'TTP':
        props = {
          xid: 'TTP',
          x: 629,
          y: 282,
          width: 100,
          height: 100,
          rx: 8,
          tx: 630,
          ty: 298,
          nodeLabel: this.state.nodesTTP.length
        }
        break
      case 'CMP':
        props = {
          xid: 'CMP',
          x: 312,
          y: 282,
          width: 100,
          height: 100,
          rx: 8,
          tx: 315,
          ty: 298,
          nodeLabel: this.state.nodesCampaign.length
        }
        break
      case 'ACT':
        props = {
          xid: 'ACT',
          x: 0,
          y: 282,
          width: 100,
          height: 100,
          rx: 8,
          tx: 0,
          ty: 298,
          nodeLabel: this.state.nodesThreatActor.length
        }
        break
      default:
        break
    }
    return props
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
        <svg width={graphWidth} height={graphHeight} viewBox="300 408 1211 388" >
          <g id="Entities" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(300.000000, 408.000000)">
            <StixNode {...this._getProps('OBS')} />
            <StixNode {...this._getProps('IND')} />
            <StixNode {...this._getProps('INC')} />
            <StixNode {...this._getProps('COA')} />
            <StixNode {...this._getProps('EXP')} />
            <StixNode {...this._getProps('TTP')} />
            <StixNode {...this._getProps('CMP')} />
            <StixNode {...this._getProps('ACT')} />
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
