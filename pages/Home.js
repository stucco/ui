import React from 'react'
import cx from 'classnames'

import SearchBox from '../components/SearchBox'

import Layout from '../components/Layout'

class Search extends React.Component {
  render () {
    return (
      <Layout className='container-fluid'>
        <section className={cx('page', 'active')}>
          <div className='search-query-title'>
            <h1>Stucco</h1>
          </div>
          <SearchBox />
        </section>
      </Layout>
    )
  }
}

export default Search