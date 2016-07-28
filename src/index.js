import React from 'react'
import ReactDom from 'react-dom'
import routes from './routes'

import './css/flexboxgrid.min.css'
import './css/vis.css'
import './css/font-awesome.min.css'
import './css/app.css'
import './css/bootstrap.css'

ReactDom.render(
  <div>{routes}</div>
  , document.getElementById('root')
)
