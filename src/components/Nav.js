import React from 'react'
import { Link } from 'react-router'

class Nav extends React.Component {
  render () {
    return (
      <nav role='navigation'>
        <ul>
          <li><Link to='/home' activeClassName='active'>Home</Link></li>
          <li><Link to='/search' activeClassName='active'>Stucco</Link></li>
          <li><Link to='/help' activeClassName='active'>Help</Link></li>
        </ul>
      </nav>
    )
  }
}

export default Nav
