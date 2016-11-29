import React from 'react'
import cx from 'classnames'
import Link from './Link'
import history from '../core/history'

import { connect } from 'react-redux'
import { SET_VERTEX } from '../redux/actions'

class Result extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      vertex: this.props.vertex
    }
    this.handleDetails = this.handleDetails.bind(this)
    this.transition = this.transition.bind(this)
  }

  handleDetails () {
    const vertex = this.props.vertex
    this.props.dispatch(SET_VERTEX(vertex))
  }

  transition (event) {
    this.handleDetails()
    let url = "/details/" + this.props.vertex._id
    event.preventDefault();
    history.push({ pathname: url });
  }

  render () {
    return (
      <li className='list-group-item'>
        <dl className='dl-horizontal-result'>
          <dt>
            <a onClick={this.transition}>{this.props.vertex.name}</a>
          </dt>
          <dd>
            <span className={cx('pull-right', 'text-uppercase', 'initialism')} >
              {(this.props.vertex.hasOwnProperty('observableType') && this.props.vertex.vertexType !== 'IP') ? this.props.vertex.observableType : this.props.vertex.vertexType}
            </span>
            <span>{this.props.vertex.description}</span>
          </dd>
        </dl>
      </li>
    )
  }
}

Result.propTypes = {
  vertex: React.PropTypes.object,
  dispatch: React.PropTypes.func
}

export default connect()(Result)
