import React from 'react'

import CytoscapeGraph from './vis/src/CytoscapeGraph'

let stuccoOntology = require('./vis/data/cytoscape-graph/data.json');

class Graph extends React.Component {
  constructor () {
  	super()
  }
  render () {
    return (  
      <div > 
        <CytoscapeGraph graph={stuccoOntology} /> 
      </div>
    ) 
  }
}

export default Graph
                          