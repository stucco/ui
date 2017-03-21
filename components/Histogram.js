import React from 'react'
import cx from 'classnames'
import { format } from 'd3-format'

import { countNodes } from '../helpers/StuccoApi'
import { HistogramChart, Settings } from './vis/src'
import { randomStackedHistogramData, histogramData, temporalHistogramData, stackedHistogramData } from './vis/data/exampleData'

const getTemporalSelection = (selection) => {
  return temporalHistogramData.map((histogram) => {
    let transformedObj = {name: histogram.name, type: histogram.type}
    transformedObj.bins = histogram.bins.map((bin) => {
      let selected = true
      let dateX = new Date(bin.x)
      if (selection.length === 2 && (dateX < selection[0] || dateX >= selection[1])) {
        selected = false
      }
      return {
        x: dateX,
        y: bin.y,
        className: selected ? 'selected' : null
      }
    })
    return transformedObj
  })
}

const toolTipFunction = (d) => {
  if (!d || !d.stackCounts) return null
  let total = d.stackCounts.reduce((prev, count) => {
    return prev + count
  }, 0)
  let toolTip =
    '<span class="title">' + d.label + '</span>' +
    '</span>Total: ' + format(',')(total) +
    '<br /><small>'
  toolTip += d.stackCounts.reduceRight((prev, count, index) => {
    return prev + d.stackNames[index] + ' : ' + format(',')(count) + '<br />'
  }, '')
  toolTip += '</small>'
  return toolTip
}

const onBarClick = (event, data) => {
  console.groupCollapsed('Bar ' + data.label)
  console.log(event.target)
  console.log(data)
  console.groupEnd()
}

class Histogram extends React.Component {
  constructor (props) {
    super(props)
    this.onChart1Enter = this.onChart1Enter.bind(this)
    this.onChart1Leave = this.onChart1Leave.bind(this)
    this.onBrush = this._onBrush.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.brushedVals = []
    this.updateHistogram = this.updateHistogram.bind(this)
    this.temporalData = this.handleClick(7)

    let id = 'histogram_endpoint'
    let sortBy = JSON.parse(localStorage.getItem(id + '_sortBy'))
    let sortOrder = JSON.parse(localStorage.getItem(id + '_sortOrder'))
    let yScaleType = JSON.parse(localStorage.getItem(id + '_yScaleType'))

    this.state = {
      sortBy: (sortBy === 'Default') ? null : sortBy,
      sortOrder: (sortOrder === 'Default') ? null : sortOrder,
      sortTypes: ['two'],
      yScaleType: (yScaleType === 'Default' || !yScaleType) ? 'linear' : yScaleType,
      chart1xAxis: {
        type: 'x',
        orient: 'bottom'
      },
      randomData: randomStackedHistogramData(),
      temporalData: this.temporalData
    }

    this.settings = {
      title: 'Options',
      options: [
        {
          type: 'dropdown',
          label: 'Scale Type: ',
          options: [
            'Default', 'Linear', 'Log', 'Pow'
          ],
          defaultSelected: () => {
            let defaultValue = this.state.yScaleType
            return defaultValue === null ? 'Default' : defaultValue.charAt(0).toUpperCase() + defaultValue.slice(1)
          },
          onChange: (value) => {
            localStorage.setItem(id + '_yScaleType', JSON.stringify(value.toLowerCase()))
            this.setState({
              yScaleType: value.toLowerCase()
            })
          }
        }, {
          type: 'dropdown',
          label: 'Sort By: ',
          options: [
            'Default', 'Document Count', 'Key'
          ],
          defaultSelected: () => {
            let defaultValue = this.state.sortBy
            return defaultValue === null
              ? 'Default'
              : defaultValue === 'x'
                ? 'Key'
                : 'Document Count'
          },
          onChange: (value) => {
            let newValue = value === 'Default'
              ? null
              : value === 'Key'
                ? 'x'
                : 'y'
            localStorage.setItem(id + '_sortBy', JSON.stringify(newValue))
            this.setState({
              sortBy: newValue
            })
          }
        }, {
          type: 'dropdown',
          label: 'Sort Order: ',
          options: [
            'Default', 'Ascending', 'Descending'
          ],
          defaultSelected: () => {
            let defaultValue = this.state.sortOrder
            return defaultValue === null ? 'Default' : defaultValue.charAt(0).toUpperCase() + defaultValue.slice(1)
          },
          onChange: (value) => {
            let newValue = value === 'Default'
              ? null
              : value
            localStorage.setItem(id + '_sortOrder', JSON.stringify(newValue === null ? null : newValue.toLowerCase()))
            this.setState({
              sortOrder: newValue === null ? null : newValue.toLowerCase()
            })
          }
        }
      ]
    }

    this.header3 = () => {
      return ([
        <div>Temporal Histogram - Brush selection</div>
      ])
    }
  }
  _onBrush (brushedVals) {
    console.log(brushedVals)
    this.brushedVals = brushedVals
    this.temporalData = getTemporalSelection(this.brushedVals)
    this.forceUpdate()
  }
  onChart1Enter (event, data) {
    this.setState({
      xAxis: {
        type: 'x',
        orient: 'bottom',
        tickValues: [data.label]
      }
    })
  }

  onChart1Leave (event, data) {
    this.setState({
      xAxis: {
        type: 'x',
        orient: 'bottom'
      }
    })
  }

  componentDidMount () {
    this.createRandomData = () => {
      setTimeout(() => {
        if (this.createRandomData !== null) {
          this.setState({
            randomData: randomStackedHistogramData()
          }, () => {
            if (this.createRandomData !== null) {
              this.createRandomData()
            }
          })
        }
      }, 5000)
    }
    this.createRandomData()
  }

  componentWillUnmount () {
    this.createRandomData = null
  }

  handleClick(days) {
    console.log(days)
    let req = {
      query: {
        days: days
      }
    }
    let ret = {}
    countNodes(req, ret, this.updateHistogram)
  }

  updateHistogram(ret) {
    let count = ret.send.count
    var bins = []
    for (var i = 0; i < count.length; i++) {
      var today = new Date()
      today.setDate(today.getDate() - i)
      bins[i] = {
        x: today,
        y: count[i]
      }
    }
    console.log(bins)
    bins = bins.reverse()
    let newData = [
      {
        name: 'temporal',
        type: 'temporal',
        bins: bins
      }
    ]
    this.setState({temporalData: newData})
  } 

  render () {
    var histogramStyle = {
      textAlign: 'center'
    }
    return (
      <div className='container-fluid'>
        <div className='row' style={{overflow: 'hidden'}}>
          <div className={cx('col-xs-12', 'align-bottom')}>
              <div style={{textAlign: 'center', lineHeight: '300px'}}>
                <HistogramChart xScaleType='time'
                  width={600} height={150} data={this.state.temporalData} tipFunction={toolTipFunction}
                  addOverlay brushed onBrush={this.onBrush} />
              </div>
              <div style={{textAlign: 'center'}}>
                <button type="submit" className={cx('btn', 'btn-default')} onClick={() => this.handleClick(30)}>30 Days</button>
                <button type="submit" className={cx('btn', 'btn-default')} onClick={() => this.handleClick(14)}>14 Days</button>
                <button type="submit" className={cx('btn', 'btn-default')} onClick={() => this.handleClick(7)}>1 Week</button>
                <button type="submit" className={cx('btn', 'btn-default')} onClick={() => this.handleClick(1)}>1 Day</button>
              </div>
          </div>
        </div>
      </div>

    )
  }
}

export default Histogram
