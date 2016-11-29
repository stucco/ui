import React from 'react'

import cx from 'classnames'
import history from '../core/history'

import { search } from '../helpers/StuccoApi'

import Result from '../components/Result'
import Layout from '../components/Layout'
import Link from '../components/Link'


class ResultsList extends React.Component {
  render () {
    let vertex = this.props.vertex
    let key = this.props.route.params.key
    let value = this.props.route.params.value
    let page = this.props.route.params.pNumber
    let pageSize = this.props.route.params.pSize
    function handleClickNext (event) {
      event.preventDefault()
      ++page
      transition()
    }
    
    function handleClickPrevious (event) {
      event.preventDefault()
      if (page > 0) {
        --page
      }
      transition()
    }

    function transition () {
      let url = "/resultslist/search/" + key + "=" + value + "&page=" + page + "&pageSize=20"
      history.push({ pathname: url })
    }
    return (
      <Layout className='container-fluid'>
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
                    {this.props.route.params.key + ' = ' + this.props.route.params.value}
                  </span>
                </h3>
              </div>
              <div className='panel-body'>
                <ul className='results-list'>
                  {this.props.vertex.results.map((vertex, i) => <Result key={i} vertex={vertex} />)}
                </ul>
              </div>
              <div className='panel-footer'>
                <nav>
                  <ul className='pager'>
                    <li className='previous'>
                      <a onClick={handleClickPrevious}><span aria-hidden='true'>&larr;</span> Previous</a>
                    </li>
                    <li className='next'>
                      <a onClick={handleClickNext}>Next <span aria-hidden='true'>&rarr;</span></a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

ResultsList.propTypes = {
  location: React.PropTypes.object,
  query: React.PropTypes.object,
  send: React.PropTypes.object,
  vertex: React.PropTypes.object
}

export default ResultsList
