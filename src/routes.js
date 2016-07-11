import React from 'react'
import { IndexRedirect, Route, Router, browserHistory } from 'react-router'

import App from './components/App'
import ResultsList from './components/ResultsList'
import Home from './views/Home'
import Search from './views/Search'
import Help from './views/Help'

const reactRouterRoutes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRedirect to='home' />
      <Route path='home' component={Home} />
      <Route path='search' component={Search} />
      <Route path='resultslist' component={ResultsList} />
      <Route path='help' component={Help} />
    </Route>
  </Router>
)

export default reactRouterRoutes
