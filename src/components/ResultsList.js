import React from 'react'

import cx from 'classnames'

import Result from './Result'

class ResultsList extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.props = props
    this.context = context
  }
  render () {
    return (
      <section className='page'>
        <div className='results'>
          <div className={cx('panel', 'panel-primary')}>
            <div className='panel-heading'>
              <div className='pull-right'>
                <button type='button' aria-label='Close' className='close'>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <h3 className='panel-title'>Query &nbsp; &#10230; &nbsp; <span className='q'></span></h3>
            </div>
            <div className='panel-body'>
              <ul className='resList'></ul>
            </div>
            <div className='panel-footer'>
              <nav>
                <ul className='pager'>
                  <li className='previous disabled'>
                    <a href='#' ><span aria-hidden='true'>&larr;</span> Previous</a>
                  </li>
                  <li className='next'>
                    <a href='#' >Next <span aria-hidden='true'>&rarr;</span></a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <Result />
      </section>
    )
  }
}

export default ResultsList
