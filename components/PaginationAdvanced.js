import React from 'react'

import cx from 'classnames'

import { Pagination } from 'react-bootstrap'

class PaginationAdvanced extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			activePage: 1
		}
		console.log("in the paginationadvance ... ")
		this.handleSelect = this.handleSelect.bind(this)
	}

	handleSelect(eventKey) {
	    this.setState({
	      activePage: eventKey
	    })
	}

	render() {
		return (
		  <Pagination
		    prev={
                <a><span aria-hidden='true'>&larr;</span> Previous</a>
		    }
		    next={
		    	<a>Next <span aria-hidden='true'>&rarr;</span></a>
		    }
		    first={
		    	<a><span aria-hidden='true'>&larr;</span> First</a>
		    }
		    last={
		    	<a>Next <span aria-hidden='true'>&rarr;</span></a>
		    }
		    ellipsis
		    boundaryLinks
		    items={20}
		    maxButtons={5}
		    activePage={this.state.activePage}
		    onSelect={this.handleSelect} />
		);
	}
}

export default PaginationAdvanced