import React from 'react'
import { Link } from 'react-router'

import cx from 'classnames'
import { search } from '../helpers/StuccoApi'

import Result from './Result'

class ResultsList extends React.Component {
  constructor (props) {
    super(props)
    let key = this.props.location.query.key
    let value = this.props.location.query.value
    let page = Number(this.props.location.query.page)
    this.state = {
      result: [],
      key: key,
      value: value,
      page: page,
      pageSize: 20
    }
    this.handleSearch = this.handleSearch.bind(this)
  }
  componentWillMount () {
    this.handleSearch(this.props)
  }
  componentWillReceiveProps (nextProps) {
    if (this.state.key !== nextProps.location.query.key ||
        this.state.value !== nextProps.location.query.value ||
        this.state.page !== nextProps.location.query.page) {
      this.setState({key: nextProps.location.query.key})
      this.setState({value: nextProps.location.query.value})
      this.setState({page: nextProps.location.query.page})
      this.handleSearch(nextProps)
    }
  }
  handleSearch (props) {
    let query = {}
    query[props.location.query.key] = props.location.query.value
    query['page'] = props.location.query.page
    query['pageSize'] = this.state.pageSize
    let res = {}
    search({query}, res, function (res) { return this.setState({result: res.send.results}) }.bind(this))
  }
  render () {
    let query = {}
    query['key'] = this.props.location.query.key
    query['value'] = this.props.location.query.value
    query['page'] = this.props.location.query.page
    function handleClickNext () {
      ++query['page']
    }
    function handleClickPrevious () {
      if (query['page'] > 0) {
        --query['page']
      }
    }
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
                    {this.state.key + ' = ' + this.state.value}
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
                    <li className='previous'>
                      <Link to={{pathname: '/resultslist', query: query}} onClick={handleClickPrevious}><span aria-hidden='true'>&larr;</span> Previous</Link>
                    </li>
                    <li className='next'>
                      <Link to={{pathname: '/resultslist', query: query}} onClick={handleClickNext}>Next <span aria-hidden='true'>&rarr;</span></Link>
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
