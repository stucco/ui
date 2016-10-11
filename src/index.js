import React from 'react'
import ReactDom from 'react-dom'
import routes from './routes'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './redux/reducers'

import './css/app.css'
import './css/bootstrap.min.css'

let store = createStore(reducer)

console.log(store.getState())

ReactDom.render(
  <Provider store={store} >
    <div>{routes}</div>
  </Provider>
  , document.getElementById('root')
)

export default store
