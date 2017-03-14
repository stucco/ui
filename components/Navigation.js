import React from 'react'
import cx from 'classnames'

import Link from './Link'

import expandImg from './vis/data/images/icon.expand.png'
import collapseImg from './vis/data/images/icon.collapse.png'

class Navigation extends React.Component {

  constructor () {
    super()
    this.state = {
      expand: false
    }
    this.expand = this.expand.bind(this)
  }

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() { 
    window.componentHandler.downgradeElements(this.root);
  }

  expand() {
    this.setState({expand: !this.state.expand})
    
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
            <li className={cx('nav', 'navbar-nav', 'navbar-right')} onClick={ this.expand }> 
              {
                (this.state.expand) 
                  ? <img className="navbar-brand" src={ collapseImg } />
                  : <img className="navbar-brand" src={ expandImg } />
              }
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navigation
