import React from 'react'

import { Pager } from 'react-bootstrap'
import { getEdges } from '../helpers/StuccoApi'

import EdgeResult from './EdgeResult'

import cx from 'classnames'

class EdgesResultList extends React.Component {
  constructor (props) {
    super(props)
    let type = props.type
    let id = props.id
    let name = props.name
    let vertexType = props.vertexType
    this.state = {
      id: id,
      name: name,
      vertexType: vertexType,
      type: type,
      page: 0,
      edges: []
    }

    this.getEdges = this.getEdges.bind(this)
    this.renderPrevious = this.renderPrevious.bind(this)
    this.renderNext = this.renderNext.bind(this)

    this.getEdges()
  }

  componentWillReceiveProps(newProps) {
    this.setState({type: newProps.type, id: newProps.id, name: newProps.name}, function () { this.getEdges() })
  }

  getEdges () {
    let reqIn = {
      params: {
        id: this.state.id,
        name: this.state.name,
        vertexType: this.props.vertexType
      },
      query: {
        pageSize: 10,
        page: this.state.page,
        type: this.state.type
      } 
    }
    getEdges(reqIn, {}, function (res) { return this.setState({ edges: res.send.results }) }.bind(this))
  }

  renderNext() {
    let page = this.state.page + 1
    this.setState({page: page}, function () { this.getEdges() })
  }

  renderPrevious() {
    let page = this.state.page
    if (page > 0) {
      page = page - 1
      this.setState({page: page}, function () { this.getEdges() })
    }
  }

  render () {
    return (
      <dd>
        <ul style={{paddingLeft: 0}} className="inEdgeList">
          {this.state.edges.map((edge, i) => { if (Object.keys(edge).length !== 0) { return <EdgeResult type={this.state.type} key={i} vertex={edge} /> } })}
        </ul> 
        <div className='text-center'>
          <ul>
            <Pager>
              <Pager.Item previous onSelect={this.renderPrevious} >&larr; Previous Page</Pager.Item>
              <span> {this.state.page + 1} </span>
              <Pager.Item next onSelect={this.renderNext}>Next Page &rarr;</Pager.Item>
            </Pager>
          </ul>
        </div>
      </dd>
    )
  }
}

EdgesResultList.propTypes = {
  type: React.PropTypes.string,
  id: React.PropTypes.string
}

export default EdgesResultList
