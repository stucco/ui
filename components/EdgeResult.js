import React from 'react'
import cx from 'classnames'
import history from '../core/history'
import Link from './Link'

import { connect } from 'react-redux'
import { SET_VERTEX } from '../redux/actions'

class EdgeResult extends React.Component {
  render () {
    const vertex = this.props.vertex
    let dispatch = this.props.dispatch
    function handleDetails () {
      dispatch(SET_VERTEX(vertex))
    }
    "/details/vertexType=" + this.props.vertex.vertexType + "&name=" + this.props.vertex.name + "&id=" + this.props.vertex._id
    return (
      <li className='listGroupItem' >
        <Link to={"/details/vertexType=" + vertex.vertexType + "&name=" + vertex.name + "&id=" + vertex._id} onClick={handleDetails}>
          {(this.props.type === 'inEdges') ? <span>&nbsp; ⟵ &nbsp;</span> : <span>&nbsp; ⟶ &nbsp;</span>}
          <span href=''></span>
          <span>&nbsp; &nbsp;</span>
          <span>{vertex.name}</span>
        </Link>
        <span>&nbsp; &nbsp;</span>
        <span>{vertex.description}</span>
        <span>&nbsp; &nbsp;</span>
        <span className={cx('pull-right', 'text-uppercase', 'initialism')} >{(vertex.hasOwnProperty('observableType') && vertex.vertexType !== 'IP') ? vertex.observableType : vertex.vertexType}</span>
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
