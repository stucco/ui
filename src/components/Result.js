import React from 'react'
import { Link } from 'react-router'
import cx from 'classnames'

class Result extends React.Component {
  render () {
    return (
      <li className='list-group-item'>
        <dl className='dl-horizontal-result'>
          <dt>
            <Link to='/details' data-vertex={this.props.vertex} >{this.props.vertex.name}</Link>
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
  vertex: React.PropTypes.object
}

export default Result
