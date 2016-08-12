import React from 'react'
import { Link } from 'react-router'
import cx from 'classnames'

class Nav extends React.Component {
  render () {
    return (
      <nav role='navigation' className={cx('navbar', 'navbar-default')}>
        <div className='container-fluid'>
          <ul>
            <li className={cx('nav', 'navbar-header')}>
              <Link to='/search' className='navbar-brand' activeClassName='active'>Stucco</Link>
            </li>
            <li className={cx('nav', 'navbar-nav')}>
              <Link to='/home' className='navbar-brand' activeClassName='active'>Home</Link>
            </li>
            <li className={cx('nav', 'navbar-nav')}>
              <Link to='/help' className='navbar-brand' activeClassName='active'>Help</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Nav
