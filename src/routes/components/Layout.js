import React from 'react'
import { Route } from 'react-router'
import { Signup, Login } from '../../authentification'
import { isAuthenticated } from '../../authentification/roles'
import Interface from '../../interface/containers/Interface'
import Showcase from '../../showcase/components/Showcase'

class Layout extends React.Component {
  render () {
    return (
      <div className='App'>
        <Route path='/dashboard' component={isAuthenticated(Interface)} />
        <Route path='/signup' component={Signup} />
        <Route path='/login' component={Login} />
        <Route exact path='/' component={Showcase} />
      </div>
    )
  }
}

export default Layout
