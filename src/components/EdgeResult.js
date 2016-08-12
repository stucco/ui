import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import cx from 'classnames'

class EdgeResult extends React.Component {
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
    this.props.dispatch(action)
  }
  render () {
    return (
      <li className='listGroupItem' >
        <Link to={'/details/' + encodeURIComponent(this.props.vertex.name)} onClick={this.handleDetails} >
          {(this.props.type === 'inEdges') ? <span>&nbsp; ⟵ &nbsp;</span> : <span>&nbsp; ⟶ &nbsp;</span>}
          <span href=''></span>
          <span>&nbsp; &nbsp;</span>
          <span>{this.props.vertex.name}</span>
          <span>&nbsp; &nbsp;</span>
          <span>{this.props.vertex.description}</span>
          <span>&nbsp; &nbsp;</span>
          <span className={cx('pull-right', 'text-uppercase', 'initialism')} >{this.props.vertex.vertexType}</span>
        </Link>
      </li>
    )
  }
}

EdgeResult.propTypes = {
  vertex: React.PropTypes.object,
  type: React.PropTypes.string,
  dispatch: React.PropTypes.func
}

export default connect()(EdgeResult)
