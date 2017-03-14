import React from 'react'

import cx from 'classnames'
import history from '../core/history'

import { search } from '../helpers/StuccoApi'

import { Pager } from 'react-bootstrap'
import Result from '../components/Result'
import Layout from '../components/Layout'
import Link from '../components/Link'


class ResultsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 0
    }

    this.handleSelect = this.handleSelect.bind(this)
    this.renderPrevious = this.renderPrevious.bind(this)
    this.renderNext = this.renderNext.bind(this)
  }

  handleSelect() {
    let url = "/resultslist/search/" + this.props.route.params.key + "=" + this.props.route.params.value + "&page=" + this.state.page + "&pageSize=20"
    history.push({ pathname: url })
  }

  renderNext() {
    let page = this.state.page + 1
    this.setState({page: page}, function () { this.handleSelect() })
  }

  renderPrevious() {
    let page = this.state.page
    if (page > 0) {
      page = page - 1
      this.setState({page: page}, function () { this.handleSelect() })
    }
  }
 
  render () {
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
                  {this.props.vertex.results.map((vertex, i) => <Result source={this.props.route.params.source} key={i} vertex={vertex} />)}
                </ul>
              </div>
              <div className={cx('panel-footer', 'text-center')} style={{backgroundColor: '#f5f5f5', textAlign: 'center'}}>
                <div className='text-center'>
                  <ul>
                    <Pager>
                      <Pager.Item previous href="#" onSelect={this.renderPrevious} >&larr; Previous Page</Pager.Item>
                      <span> {this.state.page + 1} </span>
                      <Pager.Item next href="#" onSelect={this.renderNext}>Next Page &rarr;</Pager.Item>
                    </Pager>
                  </ul>
                </div>
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
