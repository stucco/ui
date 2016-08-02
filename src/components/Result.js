import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import cx from 'classnames'

class Result extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      vertex: this.props.vertex
    }
    this.handleDetails = this.handleDetails.bind(this)
  }
  handleDetails () {
    const vertex = this.props.vertex
    console.log(vertex)
    const action = {
      type: 'SET_VERTEX',
      vertex: {
        vertex
      }
    }
    console.log('handling details .... ')
    console.log('Result props -> look for dispatch: ', this.props)
    console.log('action -> ', action)
    this.props.dispatch(action)
  }
  render () {
    return (
      <li className='list-group-item'>
        <dl className='dl-horizontal-result'>
          <dt>
            <Link to={'/details/' + this.props.vertex.name} onClick={this.handleDetails}>{this.props.vertex.name}</Link>
          </dt>
          <dd>
            <span className={cx('pull-right', 'text-uppercase', 'initialism')} >{this.props.vertex.vertexType}</span>
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

// export default Result

export default connect()(Result)
