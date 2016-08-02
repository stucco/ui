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
    console.log(event.target.value)
    let query = event.target.value.split('=')
    this.setState({key: query[0], value: query[1]})
    console.log('state.value = ', this.state.value)
    console.log('state.key = ', this.state.key)
  //  this.state.key = query[0]
  //  this.state.value = query[1]
    // console.log('store = ', store)
  }
  handleSubmit (event) {
    event.preventDefault()
    // var xhttp = new XMLHttpRequest()
    // xhttp.setRequestHeader('Access-Control-Allow-Origin', '*')
    // xhttp.open('GET', 'http://localhost:8080/', true)
    // xhttp.send()
    // if (xhttp.readyState === 4 && xhttp.status === 200) {
    //  var response = xhttp.responseText
    //  console.log(response)
    // }
    // this.context.router.push('/resultslist')
    console.log('starting search!!!!', this.state.value)
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
    console.log(response)
    this.context.router.push('/resultslist')

    return response
  }
  render () {
    console.log('from renderign: ', this.state)
    const { key, value } = this.state
    console.log(key)
    console.log(value)
    const query = {}
    query[key] = value
    return (
      <div>
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

// SearchBox.propTypes = {
//  name: React.PropTypes.string.isRequired
// }

export default SearchBox
