import React from 'react'
import ReactDom from 'react-dom'
import routes from './routes'

import './css/flexboxgrid.min.css'
import './css/vis.css'
import './css/font-awesome.min.css'
import './css/bootstrap.css'
import './css/search.css'
import './css/app.css'

console.info('Serving examples from vis/examples')
ReactDom.render(
  <div>{routes}</div>
  , document.getElementById('root')
)
