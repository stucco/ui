import React from 'react'

// import cx from 'classnames'

class Result extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.props = props
    this.context = context
  }
  render () {
    return (
      <li className='list-group-item'>
        <dl className='dl-horizontal-result'>
          <dt>
            <a>Name</a>
          </dt>
          <dd>
            <span className='pull-right text-uppercase initialism'>Vertex Type</span>
            <span>Description</span>
          </dd>
        </dl>
      </li>
/*
      <li className='list-group-item'>
        <dl className='dl-horizontal-result'>
          <dt>
            <a>{this.props.name}</a>
          </dt>
          <dd>
            <span className='pull-right text-uppercase initialism'>{this.props.vertexType}</span>
            <span>{this.props.description}</span>
          </dd>
        </dl>
      </li>
*/
    )
  }
}

export default Result
