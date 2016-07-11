import React from 'react'

import cx from 'classnames'

class SearchBox extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      value: ''
    }
    this.context = context
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange (event) {
    console.log(event.target.value)
    this.setState({value: event.target.value})
    console.log('state.value = ', this.state.value)
  }
  handleSubmit (event) {
    event.preventDefault()
    console.log('context = ', this.context)
    this.context.router.push('/resultslist')
  }
  render () {
    return (
      <div>
        <div className='row'>
          <form className='form-horizontal' onSubmit={this.handleSubmit} >
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
              <div className='col-xs-2'>
                <button type='submit' className={cx('btn', 'btn-lg', 'btn-primary')}>
                  <span aria-hidden='true' className={cx('glyphicon', 'glyphicon-search')}>Search</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

SearchBox.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default SearchBox
