import './global.css'
import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './Routes'
import 'react-image-lightbox/style.css'

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root'),
)
