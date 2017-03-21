import React, { PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { brushX, select, event as d3Event } from 'd3'

class BrushX extends React.Component {
  constructor (props) {
    super(props)
    this.brushSelection = []
    this.brushPhase = ''
  }
  componentDidMount () {
    this.initBrush()
  }
  shouldComponentUpdate () {
    if (this.brushPhase === 'brushed' || this.brushPhase === '') {
      return true
    }
    return false
  }
  componentDidUpdate (prevProps, prevState) {
    if (this.props.width !== prevProps.width || this.props.height !== prevProps.height) {
      this.initBrush()
    }
    this.clearBrush()
  }

  initBrush () {
    let thisNode = findDOMNode(this)
    let selection = select(thisNode)
    this.brush = brushX()
      .extent([[0, 0], [this.props.width, this.props.height]])
      .on('start', this._start.bind(this))
      .on('brush', this._brush.bind(this))
      .on('end', this._end.bind(this))
    selection.call(this.brush)
  }
  _start () {
    this.brushPhase = 'start'
    this.applySelection()
  }
  _brush () {
    this.brushPhase = 'brushing'
    this.applySelection()
  }
  _end () {
    // console.log(d3Event)
    if (d3Event.selection || d3Event.sourceEvent instanceof MouseEvent) {
      this.brushPhase = 'brushed'
      // console.log('brush event firing')
      this.props.onBrush(this.brushSelection)
    }
  }
  clearBrush () {
    let thisNode = findDOMNode(this)
    let selection = select(thisNode)
    selection.call(this.brush.move, null)
    this.brushSelection = []
    this.brushPhase = ''
  }
  applySelection () {
    if (!d3Event.sourceEvent || d3Event.sourceEvent.type === 'brush' || !d3Event.selection) return
    let domain = this.calculateSelection(d3Event.selection.map(this.props.scale.invert))
    let thisNode = findDOMNode(this)
    select(thisNode)
        .call(this.brush.move, domain.map(this.props.scale))
    this.brushSelection = domain
  }
  calculateSelection (domain) {
    let { interval, scale } = this.props
    let dateScale = /time/.test(scale.type)
    if (dateScale) {
      domain = domain.map((val) => { return val.getTime() })
    }
    let nIntervals = Math.abs(scale.domain()[1] - scale.domain()[0]) / interval
    let out = domain.slice()
    for (let i = 0; i < nIntervals; i++) {
      let xVal = dateScale ? scale.domain()[0].getTime() : scale.domain()[0]
      xVal += interval * i
      if (domain[0] >= xVal && domain[0] < xVal + interval) {
        out[0] = xVal
      }
      if (domain[1] > xVal && domain[1] < xVal + interval) {
        out[1] = xVal
      }
    }
    if (out[0] === out[1]) {
      out[1] += interval
    }
    return dateScale ? [new Date(out[0]), new Date(out[1])] : out
  }
  render () {
    // console.log('brush selection is : ' + this.state.selection)
    return (
      <g className='brush' id={'brush-' + this.props.brushID}>{this.props.children}</g>
    )
  }
}

BrushX.defaultProps = {
  showHandles: false
}

BrushX.propTypes = {
  brushID: PropTypes.string.isRequired,
  children: PropTypes.node,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  interval: PropTypes.number.isRequired,
  scale: PropTypes.func.isRequired,
  showHandles: PropTypes.bool.isRequired,
  onBrush: PropTypes.func
}

export default BrushX
