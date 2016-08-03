import React from 'react'
import StixGraph from './base/StixGraph.js'
import sampleData from '../data/data.json'

export default class Playground extends React.Component {

  constructor (props) { // LEARN: constructor called every time class is instantiated
    super(props) // LEARN: calls the parent's constructor
    this.state = {
    }
    this._parseData(props)
    // console.log('CONSTRUCTOR playground STATE', this.state)
    // console.log('CONSTRUCTOR playground PROPS', this.props)
  }

  _parseData (data) { // SORT the data into arrays by entity type
    // A VERY HACKY WAY OF GETTING AT A PROPERTY
    // var snag = Object(data[0])
    // var keys = Object.getOwnPropertyNames(snag)
    // var firstKey = keys[0]
    // console.log(keys[0])
    // console.log(snag[firstKey])
  }

  // LEARN: Invoked once, both on the client and server, immediately before the initial rendering occurs.
  // If you call setState within this method, render() will see the updated state and will be
  // executed only once despite the state change.
  componentWillMount () {
    this._parseData(this.props.data) // on refresh why is this firing twice?
  }

  render () {
    return (
      <div id='playground'>
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
