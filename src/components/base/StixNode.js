import React, {PropTypes} from 'react'

// import d3 from 'd3'

export default class StixNode extends React.Component {

  constructor (props) { // LEARN: constructor called every time class is instantiated
    super(props) // LEARN: calls the parent's constructor
    console.log('CONSTRUCTOR StixNode STATE', this.state)
    console.log('CONSTRUCTOR StixNode PROPS', this.props)
  }

  render () {
    return (
      <g className='StixNode'>
        <rect id={this.props.xid} x={this.props.x} y={this.props.y} width={this.props.width} height={this.props.height} rx={this.props.rx}></rect>
        <g className='StixNodeLabel' stroke="none" transform="translate(25, 45)"strokeWidth="1" fill="none" fillRule="evenodd" fontSize="12" fontFamily="AvenirNext-Bold, Avenir Next" fontWeight="bold">
          <text id="OBSCount" fill="#4A4A4A">
            <tspan x={this.props.tx} y={this.props.ty}>{this.props.nodeLabel} {this.props.xid}</tspan>
          </text>
        </g>
      </g>
    )
  }
}

StixNode.propTypes = {
  xid: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  rx: PropTypes.number,
  tx: PropTypes.number,
  ty: PropTypes.number,
  nodeLabel: PropTypes.number
}
