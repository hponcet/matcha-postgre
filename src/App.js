import React from 'react'
import { Router, Switch, Route } from 'react-router'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import history from './config/history'
import Layout from './routes/containers/Layout'

class App extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    return (
      <Provider store={this.props.store}>
        <MuiThemeProvider>
          <Router history={history}>
            <Switch>
              <Route path='/' component={Layout} />
            </Switch>
          </Router>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default App
