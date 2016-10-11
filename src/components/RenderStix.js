import React from 'react'
import { connect } from 'react-redux'

class RenderStix extends React.Component {
  render () {
    return (
      <div>
        <h1>Hello world!</h1>
      </div>
    )
  }
}

RenderStix.propTypes = {
  report: React.PropTypes.object
}

const mapStateToProps = function (store) {
  return {
    report: store.report
  }
}

export default connect(mapStateToProps)(RenderStix)
