import React from 'react'

import { getEdges } from '../helpers/StuccoApi'

import EdgeResult from './EdgeResult'

class EdgesResultList extends React.Component {
  constructor (props) {
    super(props)
    let type = props.type
    let id = props.id
    this.state = {
      id: id,
      type: type,
      page: 0,
      edges: []
    }

    this.getEdgs = this.getEdges.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)

    this.getEdges()
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.id !== this.state.id) {
      this.setState({id: nextProps.id, type: nextProps.type, page: 0}, this.getEdges)
    }
  }
  getEdges () {
    let reqIn = {
      params: {
        id: this.state.id
      },
      query: {
        pageSize: 10,
        page: this.state.page,
        type: this.state.type
      }
    }
    getEdges(reqIn, {}, function (res) { return this.setState({edges: res.send.results}) }.bind(this))
  }
  nextPage () {
    this.setState({page: ++this.state.page}, this.getEdges)
  }
  previousPage () {
    if (this.state.page > 0) {
      this.setState({page: --this.state.page}, this.getEdges)
    }
  }
  render () {
    let type = this.state.type
    return (
      <dd>
        <ul style={{paddingLeft: 0}} className="inEdgeList">
          {this.state.edges.map(function (edge, i) { if (Object.keys(edge[2]).length !== 0) { return <EdgeResult type={type} key={i} vertex={edge[2]} /> } })}
        </ul>
        <nav>
          <ul className="pager">
            <li className="previous" onClick={this.previousPage}>
              <a href="#">
                <span aria-hidden="true">&larr;</span>
                Previous
              </a>
            </li>
            <li className="next" onClick={this.nextPage}>
              <a href="#">Next <span aria-hidden="true">&rarr;</span>
              </a>
            </li>
          </ul>
        </nav>
      </dd>
    )
  }
}

EdgesResultList.propTypes = {
  type: React.PropTypes.string,
  id: React.PropTypes.string
}

export default EdgesResultList
