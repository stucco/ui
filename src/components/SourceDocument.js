import React from 'react'

class SourceDocument extends React.Component {
  render () {
    return (
      <pre>
        {this.props.sourceDocument}
      </pre>
    )
  }
}

SourceDocument.propTypes = {
  sourceDocument: React.PropTypes.string
}

export default SourceDocument
