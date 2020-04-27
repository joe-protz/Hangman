import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

import { HashRouter } from 'react-router-dom'
import App from './App'

const appJsx = (
  <HashRouter>
    <App />
  </HashRouter>
)

ReactDOM.render(appJsx, document.getElementById('root'))
