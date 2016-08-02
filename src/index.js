import React from 'react'
import ReactDom from 'react-dom'
import routes from './routes'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import reducer from './reducers'

import './css/flexboxgrid.min.css'
import './css/vis.css'
import './css/font-awesome.min.css'
import './css/app.css'
import './css/bootstrap.css'

console.info('Serving examples from vis/examples')

let store = createStore(reducer)

console.log(store.getState())

ReactDom.render(
  <Provider store={store} >
    <div>{routes}</div>
  </Provider>
  , document.getElementById('root')
)
