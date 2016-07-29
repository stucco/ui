import React from 'react'

import cx from 'classnames'

import data from '../data/data'

import Result from './Result'

class ResultsList extends React.Component {
  constructor () {
    super()
  //  this.props = props
  //  console.log('this.props', this.props)
  //  this.context = context
    this.state = {
      result: []
    }
  }
  componentWillMount () {
    console.log('about to mount')

    var response = []
  //  var q = this.state.value.split('=')
  //  var key = q[0]
  //  var value = q[1]
    var key = 'vertexType'
    var value = 'Malware'
    for (var i = 0; i < data.length; i++) {
      if (data[i].hasOwnProperty(key)) {
        if (data[i][key] === value) {
          response.push(data[i])
        }
      }
    }
    console.log(response)

    this.setState({result: response})
    console.log(this.state)
  }
  render () {
    return (
      <section className='page'>
        <div className='results'>
          <div className={cx('panel', 'panel-primary')}>
            <div className='panel-heading'>
              <div className='pull-right'>
                <button type='button' aria-label='Close' className='close'>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <h3 className='panel-title'>Query &nbsp; &#10230; &nbsp; <span className='q'></span></h3>
            </div>
            <div className='panel-body'>
              <ul className='resList'></ul>
            </div>
            <div className='panel-footer'>
              <nav>
                <ul className='pager'>
                  <li className='previous disabled'>
                    <a href='#' ><span aria-hidden='true'>&larr;</span> Previous</a>
                  </li>
                  <li className='next'>
                    <a href='#' >Next <span aria-hidden='true'>&rarr;</span></a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div>
          {this.state.result.map((vertex, i) => <Result key={i} vertex={vertex} />)}
        </div>
      </section>
    )
  }
}

export default ResultsList
