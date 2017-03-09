import React from 'react'
import ReactDOM from 'react-dom'
import history from '../core/history'
import cx from 'classnames'

import Link from './Link'

import { SET_VERTEX } from '../redux/actions'

  const properties = {
      name: 'Name',
      vertexType: 'Vertex Type',
      observableType: 'Observable Type',
      description: 'Description',
      source: 'Source',
      ipInt: 'IP Integer',
      startIP: 'Start IP',
      endIP: 'End IP',
      startIPInt: 'Start IP Integer',
      endIPInt: 'End IP Integer'
    }

class SearchBox extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      renderResult: false,
      key: 'name',
      title: 'Name',
      value: '',
      page: 0,
      source: 'stucco'
    }
    this.transition = this.transition.bind(this)
    this.handKeyPress = this.handKeyPress.bind(this)
    this.focus = this.focus.bind(this)
    this.radioCheck = this.radioCheck.bind(this)
  }

  focus () {
    this.textInput.focus()
  }

  handKeyPress (event) {
    if (event.key == 'Enter'){
      this.transition(event)
    }
  }

  transition (event) {
    let value = ReactDOM.findDOMNode(this.textInput).value
    let url = "/resultslist/search/" + this.state.source + "/" + this.state.key + "=" + value + "&page=0&pageSize=20"
    event.preventDefault();
    history.push({ pathname: url });
  }

  radioCheck (event) {
    console.log("in console ... " , event)
    console.log(event.currentTarget.value)
    this.setState({source: event.currentTarget.value})
  }

  handleClick (event) {
    console.log(event)
    this.setState({title: properties[event]})
    this.setState({key: event})
  }

  render () {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <form className='form-horizontal' autoComplete='on' role="form">
            <div className='search-query-form'>
              <div className={cx('col-xs-6', 'col-xs-offset-2')}>
                <div className='form-group'>
                  <div className='input-group'>
                    <div className={cx("radio", "input-group-addon")} style={{borderColor: '#2e6da4', backgroundColor: '#337ab7', color: '#fff'}}>
                      <label>
                        <input type="radio" name="optionsRadios" id="optionsRadios1" value="stucco" defaultChecked  onChange={this.radioCheck}/>
                        Stucco
                      </label>
                    </div>
                    <div className={cx("radio", "input-group-addon")} style={{borderColor: '#2e6da4', backgroundColor: '#337ab7', color: '#fff'}} >
                      <label>
                        <input type="radio" name="optionsRadios" id="optionsRadios2" value="situ" onChange={this.radioCheck} />
                        Situ
                      </label>
                    </div>
                    <div className={cx("btn", "btn-default", "dropdown-toggle", "dropdown", 'input-group-addon')} style={{borderColor: '#2e6da4'}}>
                      <div type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" >
                        &nbsp;{ this.state.title }&nbsp;
                        <span className="caret"></span>
                      </div>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenu1" >
                        {Object.keys(properties).map((property, i) => <li key={i} onClick={this.handleClick.bind(this, property)}> &nbsp;&nbsp;{properties[property]}</li>)}
                      </ul>
                    </div>
                    <input autoFocus='autoFocus' className={cx('input-lg', 'form-control')} name='search' placeholder='Search...' type='text' ref={(input) => this.textInput = input} onKeyPress={this.handKeyPress} />
                  </div>
                </div>
              </div>
              <div className='col-xs-2' >
                <div className={cx('btn', 'btn-lg', 'btn-primary')} onClick={this.transition}>
                  <span style={{ariaHidden: 'true'}} className={cx('glyphicon', 'glyphicon-search')}></span> Search
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default SearchBox
