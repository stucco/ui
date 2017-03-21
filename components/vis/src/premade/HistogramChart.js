import React, { PropTypes } from 'react'
import { ascending, descending } from 'd3'

import { setScale, isOrdinalScale } from '../util/d3'
import { spreadRelated } from '../util/react'
import Chart from '../Chart'
import Axis from '../Axis'
import Tooltip from '../Tooltip'
import Histogram from '../Histogram'

class HistogramChart extends React.Component {
  constructor (props) {
    super(props)
    console.log('Props from HistogramChart: ', props)
    this.xScale = setScale(props.xScaleType)
    this.yScale = setScale(props.yScaleType)

    this.xDomain = this.props.xDomain
    this.yDomain = this.props.yDomain
 
    this.onClick = this.onClick.bind(this) 
    this.onBrush = this._onBrush.bind(this)
    this.onEnter = this.onEnter.bind(this)
    this.onLeave = this.onLeave.bind(this)
    this.onResize = this.onResize.bind(this)

    this.updateDomain = this.updateDomain.bind(this)
    this.updateRange = this.updateRange.bind(this)

    this.sortData = this.sortData.bind(this)
    this.getMaxCount = this.getMaxCount.bind(this)
    this.interval = null

    this.tip = props.tipFunction
      ? new Tooltip().attr('className', 'd3-tip').html(props.tipFunction)
      : props.tipFunction

    this.updateDomain(props, this.state)
  }

  componentWillReceiveProps (nextProps) {
    this.updateDomain(nextProps, this.state)
  }

  componentWillUnmount () {
    if (this.props.tipFunction) {
      this.tip.destroy()
    }
  }

  sortData (data, props, state) {
    let sortArr = []
    data[0].bins.sort((a, b) => {
      let i = 0
      if (props.sortBy === 'x') {
        i = props.sortOrder === 'ascending'
          ? ascending(a[props.xAccessor], b[props.xAccessor])
          : descending(a[props.xAccessor], b[props.xAccessor])
      } else {
        let useBin = (props.sortTypes.indexOf(data[0].type) > -1 || props.sortTypes.length === 0)
        let ya = useBin ? a[props.yAccessor] : 0
        let yb = useBin ? b[props.yAccessor] : 0
        for (let j = 1; j < data.length; j++) {
          let useBin = (props.sortTypes.indexOf(data[j].type) > -1 || props.sortTypes.length === 0)
          if (useBin) {
            data[j].bins.forEach((d, i) => {
              if (d[props.xAccessor] === a[props.xAccessor]) {
                ya += d[props.yAccessor]
              }
              if (d[props.xAccessor] === b[props.xAccessor]) {
                yb += d[props.yAccessor]
              }
            })
          }
        }
        i = props.sortOrder === 'ascending'
          ? ya - yb
          : yb - ya
      }
      sortArr.push(i)
      return i
    })
    // Sort rest of bins in same manner
    for (let i = 1; i < data.length; i++) {
      let j = 0
      data[i].bins.sort((a, b) => {
        return sortArr[j++]
      })
    }
    return data
  }

  getMaxCount (dataArr) {
    let max = 0
    let props = this.props
    if (props.type === 'stacked') {
      let xArr = dataArr.reduce((prev, datum, histogramIndex) => {
        if (histogramIndex > 0) {
          datum.bins.map((bin, index) => {
            prev[index] += bin[props.yAccessor]
          })
        }
        return prev
      }, dataArr[0].bins.map((bin) => bin[props.yAccessor]))
      max = Math.max(...xArr)
    } else {
      max = dataArr.reduce((oldMax, datum) => {
        let localMax = Math.max(...datum.bins.map((bin) => bin[props.yAccessor]))
        return localMax > oldMax ? localMax : oldMax
      }, 0)
    }
    return max
  }

  updateDomain (props, state) {
    if (props.data.length > 0 && props.data[0].bins.length > 0) {
      let domainData = props.data

      // Do sorting if set
      if (props.sortBy !== null && props.sortOrder !== null) {
        // Simple deep copy of data to prevent mutation of props
        domainData = this.sortData(JSON.parse(JSON.stringify(props.data)), props, state)
      }

      // Change y scale if altered
      if (props.yScaleType !== this.props.yScaleType) {
        this.yScale = setScale(props.yScaleType)
        this.updateRange(props, state)
      }

      let yDomain = [0.00001, this.getMaxCount(props.data) * 1.1]
      let xDomain = domainData[0].bins.map((bin) => bin[props.xAccessor])

      if (this.xScale.type === 'linear' || this.xScaleType === 'log' || this.xScale.type === 'pow') {
        this.interval = xDomain[1] - xDomain[0]
        xDomain = [
          xDomain[0],
          xDomain[xDomain.length - 1] + this.interval
        ]
      } else if (this.xScale.type === 'time' || this.xScale.type === 'utc') {
        let interval = (xDomain.length === 1) ? 1 : xDomain[1].getTime() - xDomain[0].getTime()
        this.interval = interval
        // Add one more interval to the domain so all bins can be rendered property
        xDomain.push(new Date(xDomain[xDomain.length - 1].getTime() + this.interval))
        xDomain = [
          xDomain[0],
          xDomain[xDomain.length - 1]
        ]
      }

      // Update scale if domains are new
      if (xDomain !== this.xDomain) {
        this.xScale.domain(xDomain)
        this.xDomain = xDomain
      }

      if (yDomain !== this.yDomain) {
        this.yScale.domain(yDomain)
        this.yDomain = yDomain
      }
    }
  }

  updateRange (props, state) {
    this.yScale.range([this.refs.chart.chartHeight, 0])
    if (props.yAxis.innerPadding && isOrdinalScale(this.yScale.type)) {
      this.yScale.paddingInner(props.yAxis.innerPadding)
    }

    if (props.yAxis.outerPadding && isOrdinalScale(this.yScale.type)) {
      this.yScale.paddingOuter(props.yAxis.outerPadding)
    }

    this.xScale.range([0, this.refs.chart.chartWidth])
    if (props.xAxis.innerPadding && isOrdinalScale(this.xScale.type)) {
      this.xScale.paddingInner(props.xAxis.innerPadding)
    }

    if (props.xAxis.outerPadding && isOrdinalScale(this.xScale.type)) {
      this.xScale.paddingOuter(props.xAxis.outerPadding)
    }
  }
  _onBrush (data) {
    if (data && data.length === 2) {
      this.props.onBrush(data)
    }
  }

  onClick (event, data) {
    this.props.onClick(event, data)
  }

  onEnter (event, data) {
    if (data && this.tip) {
      console.log("showing .. ")
      this.tip.show(event, data)
    }
    this.props.onEnter(event, data)
  }

  onLeave (event, data) {
    if (data && this.tip) {
      this.tip.hide(event, data)
    }
    this.props.onLeave(event, data)
  }

  onResize () {
    this.updateRange(this.props, this.state)
  }

  render () {
    let props = this.props
    return (
      <Chart ref='chart' {...spreadRelated(Chart, props)} resizeHandler={this.onResize}>
        <Histogram className='histogram' {...spreadRelated(Histogram, props)}
          brushID={props.brushed ? props.endpoint : null}
          xScale={this.xScale} yScale={this.yScale}
          onEnter={this.onEnter} onLeave={this.onLeave} onClick={this.onClick} onBrush={this.onBrush} />
        <Axis className='x axis' {...props.xAxis} scale={this.xScale} />
        <Axis className='y axis' {...props.yAxis} scale={this.yScale} />
      </Chart>
    )
  }
}

HistogramChart.defaultProps = {
  // Premade default
  data: [],
  xDomain: [],
  yDomain: [],
  yScaleType: 'linear',
  xScaleType: 'band',
  sortBy: null,
  sortOrder: null,
  sortTypes: [],
  // Spread chart default
  ...Chart.defaultProps,
  // Spread histogram default
  ...Histogram.defaultProps,
  xAxis: {
    type: 'x',
    orient: 'bottom',
    innerPadding: null,
    outerPadding: null,
    animationDuration: 500
  },
  yAxis: {
    type: 'y',
    orient: 'left',
    innerPadding: null,
    outerPadding: null,
    animationDuration: 500
  }
}

HistogramChart.propTypes = {
  ...Histogram.propTypes,
  ...Chart.propTypes,
  sortBy: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  sortOrder: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  sortTypes: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool
  ]),
  onBrush: PropTypes.func,
  onClick: PropTypes.func,
  onEnter: PropTypes.func,
  onLeave: PropTypes.func,
  tipFunction: PropTypes.func,
  xScaleType: PropTypes.string,
  yScaleType: PropTypes.string,
  xDomain: PropTypes.array,
  yDomain: PropTypes.array,
  xAccessor: PropTypes.any,
  yAccessor: PropTypes.any,
  xAxis: PropTypes.object,
  yAxis: PropTypes.object
}

export default HistogramChart
