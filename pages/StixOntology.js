import React from 'react'
import spdf from 'simple-react-pdf'

class StixOntology extends React.Component {
  render () {
  	var display = {
  		display: 'block',
  		marginLeft: 'auto', 
  		marginRight: 'auto'
  	}
    return (
      <div>
        <img style={display} src={require('../ontology/stix_ontology.png')} />
      </div>
    )
  }
}

export default StixOntology