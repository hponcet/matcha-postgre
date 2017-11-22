import React from 'react'
import Menu from '../containers/Menu'
import { Switch, Route, Redirect } from 'react-router'
import history from '../../config/history'

import Home from '../../home/containers/Home'
import Profil from '../../profil/containers/Profil'

import './Interface.css'

class Interface extends React.Component {
  componentWillMount () {
    this.props.fetchUser()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.user && !nextProps.user.profil && this.props.location.pathname !== '/dashboard/profil') history.push('/dashboard/profil')
  }

  render () {
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <Menu />
        <div className='Home__contentContainer'>
          <Route path='/dashboard/home' component={Home} />
          <Route path='/dashboard/profil' component={Profil} />
          <Switch>
            <Redirect exact from='/dashboard' to='/dashboard/home' />
          </Switch>
        </div>
      </div>
    )
  }
}

export default Interface
