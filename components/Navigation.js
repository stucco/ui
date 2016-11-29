import React from 'react'
import cx from 'classnames'

import Link from './Link'

class Navigation extends React.Component {

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    return (
      <nav role='navigation' className={cx('navbar', 'navbar-default')} ref={node => (this.root = node)}>
        <div className='container-fluid'>
          <ul>
            <li className={cx('nav', 'navbar-header')}>
              <Link to='/' className='navbar-brand'>Stucco</Link>
            </li>
            <li className={cx('nav', 'navbar-nav')}>
              <Link to='/' className='navbar-brand'>Home</Link>
            </li>
            <li className={cx('nav', 'navbar-nav')}>
              <Link to='/help' className='navbar-brand'>Help</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

}

export default Navigation
