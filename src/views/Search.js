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
        <main data-hook='page-container'>
          <section className={cx('page', 'active')}>
            <div className='search-query-title'>
              <h1>Stucco</h1>
            </div>
            <SearchBox />
          </section>
        </main>
      </div>
    )
  }
}

export default Search
