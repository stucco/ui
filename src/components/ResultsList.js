import React from 'react'

import cx from 'classnames'
import { search } from '../helpers/StuccoApi'

// import data from '../data/data'

import Result from './Result'

class ResultsList extends React.Component {
  constructor (props) {
    super(props)
    var key = Object.keys(this.props.location.query)[0]
    var value = this.props.location.query[key]
    this.state = {
      result: [],
      query: {
        key: key,
        value: value
      }
    }
    this.searchCallback = this.searchCallback.bind(this)
  }
  searchCallback (res) {
    this.setState({result: res.send.results})
  }
  componentWillMount () {
    var key = this.state.query.key
    var value = this.state.query.value
    var query = {}
    query[key] = value
    query['pageSize'] = 10
    query['page'] = 0
    var res = {}
    search({query}, res, this.searchCallback)
  }
  render () {
    return (
      <div className='container-fluid'>
        <section className={cx('page', 'active')}>
          <div className='results'>
            <div className={cx('panel', 'panel-primary')}>
              <div className='panel-heading'>
                <div className='pull-right'>
                  <button type='button' aria-label='Close' className='close'>
                    <span aria-hidden='true'>&times;</span>
                  </button>
                </div>
                <h3 className='panel-title'>Query &nbsp; &#10230; &nbsp;
                  <span className='q'>
                    {this.state.query.key + ' = ' + this.state.query.value}
                  </span>
                </h3>
              </div>
              <div className='panel-body'>
                <ul className='results-list'>
                  {this.state.result.map((vertex, i) => <Result key={i} vertex={vertex} />)}
                </ul>
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
        </section>
      </div>
    )
  }
}

ResultsList.propTypes = {
  location: React.PropTypes.object,
  query: React.PropTypes.object
}

export default ResultsList
