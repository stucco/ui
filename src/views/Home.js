import React from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import Playground from '../components/Playground'

class Home extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <SideBar />
        <Playground />
      </div>
    )
  }
}

export default Home
