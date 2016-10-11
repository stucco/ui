import React from 'react'
import { Link } from 'react-router'

import cx from 'classnames'

class SearchBox extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      key: '',
      value: '',
      page: 0
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange (event) {
    let input = event.target.value.split(/\s*=\s*/)
    let key = input[0]
    let value = input[1]
    this.setState({key: key})
    this.setState({value: value})
  }
  render () {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <form className='form-horizontal' autoComplete='on' >
            <div className='search-query-form'>
              <div className={cx('col-xs-6', 'col-xs-offset-2')}>
                <div className='form-group'>
                  <div style={{dataAnddomDisplay: '', dataAnddomHidden: 'true', display: 'none'}}>
                    <div className={cx('alert', 'alert-danger')}>This field is required.</div>
                  </div>
                  <label className='sr-only'>Search query</label>
                  <input autoFocus='autoFocus' className={cx('input-lg', 'form-control')} name='search' placeholder='Search...' type='text' onChange={this.handleChange} />
                </div>
              </div>
              <div className='col-xs-2' >
                <Link to={{pathname: '/resultslist', query: this.state}} className={cx('btn', 'btn-lg', 'btn-primary')}>
                  <span style={{ariaHidden: 'true'}} className={cx('glyphicon', 'glyphicon-search')}></span> Search
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
