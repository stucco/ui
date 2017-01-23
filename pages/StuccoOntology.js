import React from 'react'
import spdf from 'simple-react-pdf'

class StuccoOntology extends React.Component {
  render () {
    return (
      <div>
        <spdf.SimplePDF file='../ontology/stucco_graph.pdf' />
      </div>
    )
  }
}

export default StuccoOntology