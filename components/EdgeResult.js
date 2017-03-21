import React from 'react'
import cx from 'classnames'
import history from '../core/history'
import Link from './Link'

import { connect } from 'react-redux'
import { SET_VERTEX } from '../redux/actions'

class EdgeResult extends React.Component {
  render () {
    return (
      <li className='listGroupItem' >
        <Link to={encodeURI('/details/vertexType=' + this.props.vertex.vertexType + '&name=' + this.props.vertex.name + '&id=' + this.props.vertex._id)} >
          {(this.props.type === 'inEdges') ? <span>&nbsp; ⟵ &nbsp;</span> : <span>&nbsp; ⟶ &nbsp;</span>}
          <span href=''></span>
          <span>&nbsp; &nbsp;</span>
          <span>{this.props.vertex.name}</span>
        </Link> 
        <span>&nbsp; &nbsp;</span>
        <span>{this.props.vertex.description}</span>
        <span>&nbsp; &nbsp;</span>
        <span className={cx('pull-right', 'text-uppercase', 'initialism')} >{(this.props.vertex.hasOwnProperty('observableType') && this.props.vertex.vertexType !== 'IP') ? this.props.vertex.observableType : this.props.vertex.vertexType}</span>
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
 