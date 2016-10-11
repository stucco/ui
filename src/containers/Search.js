import React from 'react'
import cx from 'classnames'

import SearchBox from '../components/SearchBox'

class Search extends React.Component {
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
