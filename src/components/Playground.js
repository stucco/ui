import React from 'react'
import StixGraph from './base/StixGraph.js'
import sampleData from '../data/data.json'

export default class Playground extends React.Component {

  constructor (props) { // LEARN: constructor called every time class is instantiated
    super(props) // LEARN: calls the parent's constructor
    this.state = {
    }
    console.log('CONSTRUCTOR playground STATE', this.state)
    console.log('CONSTRUCTOR playground PROPS', this.props)
  }

  componentWillMount () { // LEARN: react lifecycle function called JUST BEFORE rendering
  }

  render () {
    return (
      <div id='Playground'>
        <p> I am the playground component </p>
        <StixGraph {...this.props} />
      </div>
    )
  }
}

Playground.defaultProps = {
  data: sampleData,
  graphSize: sampleData.length,
  graphHeight: 750,
  graphWidth: 750
}

Playground.propTypes = {
  ...StixGraph.propTypes
}
