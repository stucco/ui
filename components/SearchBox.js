import React from 'react'
import ReactDOM from 'react-dom'
import history from '../core/history'
import cx from 'classnames'

import Link from './Link'

import { SET_VERTEX } from '../redux/actions'

class SearchBox extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      renderResult: false,
      key: '',
      value: '',
      page: 0
    }
    this.transition = this.transition.bind(this)
    this.enterTransition = this.transition.bind(this)
    this.focus = this.focus.bind(this)
  }

  focus () {
    this.textInput.focus()
  }

  enterTransition (event) {
    if (event.key == 'Enter') {
      console.log('in enterTransition ... ')
      transition(event)
    }
  }

  transition (event) {
    let inputText = ReactDOM.findDOMNode(this.textInput).value
    let input = inputText.split(/\s*=\s*/)
    let key = input[0]
    let value = input[1]
    let url = "/resultslist/search/" + key + "=" + value + "&page=0&pageSize=20"
    event.preventDefault();
    history.push({ pathname: url });
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
                  <input autoFocus='autoFocus' className={cx('input-lg', 'form-control')} name='search' placeholder='Search...' type='text' ref={(input) => this.textInput = input} onKeyPress={this.enterTransition} />
                </div>
              </div>
              <div className='col-xs-2' >
                <form className={cx('btn', 'btn-lg', 'btn-primary')} onClick={this.transition}>
                  <span style={{ariaHidden: 'true'}} className={cx('glyphicon', 'glyphicon-search')}></span> Search
                </form>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default SearchBox
