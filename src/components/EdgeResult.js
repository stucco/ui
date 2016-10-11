import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import cx from 'classnames'

import { SET_VERTEX } from '../redux/actions'

class EdgeResult extends React.Component {
  render () {
    const vertex = this.props.vertex
    let dispatch = this.props.dispatch
    function handleDetails () {
      dispatch(SET_VERTEX(vertex))
    }
    return (
      <li className='listGroupItem' >
        <Link to={'/details/' + encodeURIComponent(vertex.name)} onClick={handleDetails} >
          {(this.props.type === 'inEdges') ? <span>&nbsp; ⟵ &nbsp;</span> : <span>&nbsp; ⟶ &nbsp;</span>}
          <span href=''></span>
          <span>&nbsp; &nbsp;</span>
          <span>{vertex.name}</span>
          <span>&nbsp; &nbsp;</span>
          <span>{vertex.description}</span>
          <span>&nbsp; &nbsp;</span>
          <span className={cx('pull-right', 'text-uppercase', 'initialism')} >{(vertex.hasOwnProperty('observableType') && vertex.vertexType !== 'IP') ? vertex.observableType : vertex.vertexType}</span>
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
