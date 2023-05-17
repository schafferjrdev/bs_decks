import './global.css'
import React from 'react'
import ReactDOM from 'react-dom'
import AllRoutes from './Routes'
import 'react-image-lightbox/style.css'

ReactDOM.render(
  <React.StrictMode>
    <AllRoutes />
  </React.StrictMode>,
  document.getElementById('root'),
)
