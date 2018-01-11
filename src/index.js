import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import io from 'socket.io-client'

import './styles/App.css'

window.matcha = { socket: io('http://localhost:8000') }
const store = createStore(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const MOUNT_NODE = document.getElementById('root')

const App = require('./App').default

ReactDOM.render(
  <App store={store} />,
  MOUNT_NODE
)
