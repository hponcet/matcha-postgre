import React from 'react'
import { Route } from 'react-router'
import {Signup} from '../../authentification'

class Layout extends React.Component {
  render () {
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <Route path='/signup' component={Signup} />
      </div>
    )
  }
}

export default Layout
