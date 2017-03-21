import React, { PropTypes } from 'react'
import ReactDom from 'react-dom'
import { select } from 'd3'

import { setAxis, isOrdinalScale } from './util/d3'
// Truncate labels based on maximum allowable characters, where
// characters should be estimated at 8-10 pixels per character.
const truncateLabel = (d, maxChars) => {
  if (d == null) {
    console.warn('No label to truncate, check and makes sure the container has the correct accessor.key specified')
    return ''
  }
  let replacementString = '...'
  if (d.length > maxChars + replacementString.length) {
    return d.substring(0, maxChars) + '...'
  }
  return d
}

class Axis extends React.Component {
  constructor (props) {
    super(props)
    this.state = { range: 0, ticks: 0 }

    this.resizeAxis = this.resizeAxis.bind(this)

    this.axis = setAxis(props.orient)
    this.axis.scale(props.scale)
  }

  componentDidMount () {
    this.resizeAxis()
  }

  componentDidUpdate () {
    this.resizeAxis()
  }

  // Re-calculate postions of the chart based on the currently rendered position
  resizeAxis () {
    let props = this.props
    let thisNode = ReactDom.findDOMNode(this)
    let parentNode = thisNode.parentNode
    let selector = '.' + props.className.replace(/ /g, '.')
    let selection = select(parentNode).select(selector)

    let tickCount = 0
    let tickValues = props.tickValues
    let tickPreformatValues = []
    let tickFormatter = null

    if (props.scale.domain().length > 0) {
      // Use custom tick count if it exist
      if (props.tickCount) {
        tickCount = props.tickCount
      } else {
        tickCount = props.type === 'y' ? 3 : props.scale.domain().length
      }

      // Set tickFormatter to be used
      if (isOrdinalScale(props.scale.type)) {
        let maxWidth = 0
        let fontSize = 12

        if (props.orient === 'top' || props.orient === 'bottom') {
          let binWidth = Math.floor((props.scale.step()))
          maxWidth = Math.floor(binWidth / fontSize)
        } else {
          if (props.orient === 'left') {
            maxWidth = props.margin.left
          } else {
            maxWidth = props.margin.right
          }
        }

        tickFormatter = (d) => {
          tickPreformatValues.push(d)
          return truncateLabel(d, maxWidth)
        }
      } else if (props.tickFormat) {
        tickFormatter = (d, i) => {
          tickPreformatValues.push(d)
          return props.tickFormat(d, i)
        }
      } else {
        tickFormatter = (d, i) => {
          // Default d3 method of formatting
          // Allows obtaining the real value for styling before it's formatted
          tickPreformatValues.push(d)
          let tick = (typeof props.scale.tickFormat === 'function')
            ? props.scale.tickFormat()(d)
            : d
          return tick
        }
      }
    }

    // Setup axis
    this.axis
      .tickFormat(tickFormatter)
      .tickValues(tickValues)
      .ticks(tickCount)

    // Create and animate axis
    selection
      .transition().duration(props.animationDuration)
      .call(this.axis)

    // Add styling to axis
    if (props.tickStyle) {
      selection.selectAll('.tick text')
        .each(function (d, i) {
          let tick = select(this)
          props.tickStyle(tick, tickPreformatValues[i], i)
        })
    }
  }

  render () {
    let props = this.props
    let transform = ''
    if (props.orient === 'bottom') {
      transform = 'translate(0,' + props.chartHeight + ')'
    } else if (props.orient === 'right') {
      transform = 'translate(' + props.chartWidth + ',0)'
    }

    return (
      <g className={props.className} transform={transform}>
        {props.label != null
          ? <text className='label'>{props.label}</text>
          : undefined
        }
      </g>
    )
  }
}

Axis.defaultProps = {
  type: 'x',
  orient: 'left',
  tickValues: null,
  tickCount: null,
  tickFormat: null,
  tickStyle: null,
  animationDuration: 0,
  label: null
}

Axis.propTypes = {
  orient: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  animationDuration: PropTypes.number,
  tickStyle: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.bool
  ]),
  tickValues: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool
  ]),
  tickCount: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.bool
  ]),
  tickFormat: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.bool
  ]),
  label: PropTypes.string,
  scale: PropTypes.any
}
export default Axis
