import React from 'react'
import { Route } from 'react-router'
import { Signup } from '../../authentification'
import Interface from '../../interface/containers/Menu'
import Showcase from '../../showcase/components/Showcase'

class Layout extends React.Component {
  render () {
    const { ifAuthentified } = this.props
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <Route exact path='/' component={Showcase} />
        <Route path='/' component={ifAuthentified(Interface)} />
        <Route path='/signup' component={Signup} />
      </div>
    )
  }
}

export default Layout
