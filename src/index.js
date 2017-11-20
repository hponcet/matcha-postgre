import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import './styles/App.css'

const store = createStore(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const MOUNT_NODE = document.getElementById('root')

const App = require('./App').default

ReactDOM.render(
  <App store={store} />,
  MOUNT_NODE
)
