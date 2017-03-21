import React, { PropTypes } from 'react'
import ReactTransitionGroup from 'react-addons-transition-group'

import { setEase } from './util/d3'
import SVGComponent from './SVGComponent'

class Scatterplot extends React.Component {
  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.onEnter = this.onEnter.bind(this)
    this.onLeave = this.onLeave.bind(this)
  }

  onClick (event, data, index) {
    this.props.onClick(event, data, index)
  }

  onEnter (event, data, index) {
    this.props.onEnter(event, data, index)
  }

  onLeave (event, data, index) {
    this.props.onLeave(event, data, index)
  }

  render () {
    let { keyFunction, ...props } = this.props
    return (
      <ReactTransitionGroup component='g' className={props.className}>
        {this.props.data.map((d, i) => {
          return (
            <SVGComponent Component='circle' key={keyFunction(d, i)}
              data={d}
              index={i}
              onUpdate={{
                func: (transition, props) => {
                  transition
                    .delay(0)
                    .duration(500)
                    .ease(setEase('linear'))
                    .attr('r', props.r)
                    .attr('cx', props.cx)
                    .attr('cy', props.cy)
                  return transition
                }
              }}
              r={props.radius}
              cx={props.xScale(d[props.xAccessor])}
              cy={props.yScale(d[props.yAccessor])}
              fill={props.colorScale(d[props.colorAccessor])}
              onMouseEnter={this.onEnter}
              onMouseLeave={this.onLeave}
              onClick={this.onClick} />
          )
        })}
      </ReactTransitionGroup>
    )
  }
}

Scatterplot.defaultProps = {
  xAccessor: 'x',
  yAccessor: 'y',
  colorAccessor: 'y',
  colorScale: () => '',
  keyFunction: (d, i) => i,
  radius: 5,
  onClick: () => {},
  onEnter: () => {},
  onLeave: () => {}
}

// xScale - tested to work with linear, log, pow, time, and ordinal point scales
// yScale - tested to work with linear, log, pow, time, and ordinal point scales
// keyFunction - returning unique data based ids is required for animations to work in an expected manner
Scatterplot.propTypes = {
  chartHeight: PropTypes.number,
  chartWidth: PropTypes.number,
  className: PropTypes.string,
  radius: PropTypes.number,
  xAccessor: PropTypes.string,
  yAccessor: PropTypes.string,
  colorScale: PropTypes.any,
  colorAccessor: PropTypes.string,
  keyFunction: PropTypes.func,
  xScale: PropTypes.any,
  yScale: PropTypes.any,
  data: PropTypes.array,
  onClick: PropTypes.func,
  onEnter: PropTypes.func,
  onLeave: PropTypes.func
}

export default Scatterplot
