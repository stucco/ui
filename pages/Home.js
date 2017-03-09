import React from 'react'
import cx from 'classnames'

import SearchBox from '../components/SearchBox'
import Histogram from '../components/Histogram'
import Layout from '../components/Layout'
import Graph from '../components/Graph'

class Search extends React.Component {
  render () {
    return (
      <Layout className='container-fluid'>
        <div>
          <section className={cx('page', 'active')}>
            <div className='search-query-title'>
              <h1>Stucco</h1>
            </div>
            <SearchBox />
          </section>
        </div>
        <div>
          <Histogram />
        </div>
        <div>
          <Graph />
        </div>
      </Layout>
    )
  } 
}

export default Search 