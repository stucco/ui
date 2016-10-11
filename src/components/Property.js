import React from 'react'

class Property extends React.Component {
  render () {
    return (
      <div>
        <dt>{this.props.propertyName}</dt>
        <dd>{this.props.propertyValue}</dd>
      </div>
    )
  }
}

Property.propTypes = {
  propertyName: React.PropTypes.string,
  propertyValue: React.PropTypes.any
}

export default Property
