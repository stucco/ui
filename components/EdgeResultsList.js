import React from 'react'

import { Pagination } from 'react-bootstrap'
import { getEdges } from '../helpers/StuccoApi'

import EdgeResult from './EdgeResult'

import cx from 'classnames'

class EdgesResultList extends React.Component {
  constructor (props) {
    super(props)
    let type = props.type
    let id = props.id
    let name = props.name
    this.state = {
      id: id,
      name: name,
      type: type,
      page: 0,
      edges: []
    }

    this.getEdgs = this.getEdges.bind(this)
    this.handleSelect = this.handleSelect.bind(this)

    this.getEdges()
  }
//  componentWillReceiveProps (nextProps) {
//    if (nextProps.id !== this.state.id) {
//      this.setState({id: nextProps.id, type: nextProps.type, page: 0}, this.getEdges)
//    }
//  }
  getEdges () {
    let reqIn = {
      params: {
        id: this.state.id,
        name: this.state.name
      },
      query: {
        pageSize: 10,
        page: this.state.page,
        type: this.state.type
      }
    }
    getEdges(reqIn, {}, function (res) { return this.setState({edges: res.send.results}) }.bind(this))
  }

  handleSelect(eventKey) {
    console.log("eventKey: ", eventKey)
    console.log("state page: ", this.state.page)
    let page = eventKey - 1
    console.log("page: ", page)
    this.setState({page: page}, this.getEdges)
    console.log("new state: ", this.state.page)
    this.getEdges()
  }

  render () {
    let type = this.state.type
    return (
      <dd>
        <ul style={{paddingLeft: 0}} className="inEdgeList">
          {this.state.edges.map(function (edge, i) { if (Object.keys(edge[2]).length !== 0) { return <EdgeResult type={type} key={i} vertex={edge[2]} /> } })}
        </ul> 
        <div className='text-center'>
          <ul>
            <Pagination
              className={cx("pagination", "pagination-sm")}
              prev={ <span aria-hidden='true'>&larr; Previous</span> }
              next={ <span aria-hidden='true'>Next &rarr;</span> }
              first={ <span aria-hidden='true'>&larr; First</span> }
              last={ <span aria-hidden='true'>Last &rarr;</span> }
              ellipsis
              boundaryLinks
              items={10}
              maxButtons={5}
              activePage={parseInt(this.state.page) + 1}
              onSelect={this.handleSelect} />
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
