import React from 'react'
import { Link } from 'react-router'

import data from '../data/data'

import cx from 'classnames'

class SearchBox extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      key: '',
      value: ''
    }
    this.context = context
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange (event) {
    let query = event.target.value.split('=')
    this.setState({key: query[0], value: query[1]})
  }
  handleSubmit (event) {
    event.preventDefault()
    var response = []
    var q = this.state.value.split('=')
    var key = q[0]
    var value = q[1]
    for (var i = 0; i < data.length; i++) {
      if (data[i].hasOwnProperty(key)) {
        if (data[i][key] === value) {
          response.push(data[i])
        }
      }
    }
    this.context.router.push('/resultslist')

    return response
  }
  render () {
    const { key, value } = this.state
    const query = {}
    query[key] = value
    return (
      <div className='container-fluid'>
        <div className='row'>
          <form className='form-horizontal' autoComplete='on' >
            <div className='search-query-form'>
              <div className={cx('col-xs-6', 'col-xs-offset-2')}>
                <div className='form-group'>
                  <div data-anddom-display='' data-anddom-hidden='true' style={{display: 'none'}}>
                    <div className={cx('alert', 'alert-danger')}>This field is required.</div>
                  </div>
                  <label className='sr-only'>Search query</label>
                  <input autoFocus='autoFocus' className={cx('input-lg', 'form-control')} name='search' placeholder='Search...' type='text' onChange={this.handleChange} />
                </div>
              </div>
              <div className='col-xs-2' >
                <Link to={{pathname: '/resultslist', query}} className={cx('btn', 'btn-lg', 'btn-primary')} >
                  <span aria-hidden='true' className={cx('glyphicon', 'glyphicon-search')} >Search</span>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default SearchBox
