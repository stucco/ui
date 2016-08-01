import React, {PropTypes} from 'react'
// import React from 'react'
// import d3 from 'd3'

export default class StixGraph extends React.Component {

  constructor (props) { // LEARN: constructor called every time class is instantiated
    super(props) // LEARN: calls the parent's constructor
    console.log('CONSTRUCTOR stixgraph STATE', this.state)
    console.log('CONSTRUCTOR stixgraph PROPS', this.props)
  }

  componentWillMount () { // LEARN: react lifecycle function called JUST BEFORE rendering
  }

  render () {
    return (
      <div id='StixGraph'>
        <p> I am a graph of the stix ontology </p>
      </div>
    )
  }
}

StixGraph.propTypes = {
  data: PropTypes.array,
  graphSize: PropTypes.number
}
