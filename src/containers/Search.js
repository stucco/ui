import React from 'react'
import cx from 'classnames'

import SearchBox from '../components/SearchBox'

class Search extends React.Component {
//  constructor () {
  //  super()
  //  var xhttp = new XMLHttpRequest()
  //  xhr.open('GET', 'http://0.0.0.0:8080', true)
//  }
  render () {
    return (
      <div className='container-fluid'>
        <section className={cx('page', 'active')}>
          <div className='search-query-title'>
            <h1>Stucco</h1>
          </div>
          <SearchBox />
        </section>
      </div>
    )
  }
}

export default Search
