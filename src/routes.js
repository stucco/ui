import React from 'react'
import { IndexRedirect, Route, Router, browserHistory } from 'react-router'

import App from './components/App'
import Details from './components/Details'
import ResultsList from './components/ResultsList'
import Home from './containers/Home'
import Help from './containers/Help'
import Search from './containers/Search'

const reactRouterRoutes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRedirect to='home' />
      <Route path='home' component={Home} />
      <Route path='search' component={Search} />
      <Route path='resultslist' component={ResultsList} />
      <Route path='details/:id' component={Details} />
      <Route path='help' component={Help} />
    </Route>
  </Router>
)
export default reactRouterRoutes
