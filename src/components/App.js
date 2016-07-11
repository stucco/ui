import React from 'react'

import Nav from './Nav'

class App extends React.Component {
  render () {
    return (
      <div>
        <Nav />
        {this.props.children}
      </div>
    )
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default App
