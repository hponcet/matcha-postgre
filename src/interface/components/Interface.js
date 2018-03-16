import React from 'react'
import Menu from '../containers/Menu'
import { Switch, Route, Redirect } from 'react-router'
import { connectSocket } from '../../notifications/socketsActions'

import Home from '../../home/containers/Home'
import Profil from '../../profil/components/Profil'
import Finder from '../../finder/containers/Finder'
import History from '../../history/containers/History'
import Chat from '../../chat/containers/Chat'

import './Interface.css'

class Interface extends React.Component {
  componentDidMount () {
    this.props.fetchProfil()
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.profil.id && nextProps.profil.id) connectSocket(nextProps.profil.id)
  }

  render () {
    return (
      <div style={{height: '100%', width: '100%'}}>
        <Menu />
        {
          <div className='Home__contentContainer'>
            <Route path='/dashboard/home' component={Home} />
            <Route path='/dashboard/profil' component={Profil} />
            <Route path='/dashboard/finder' component={Finder} />
            <Route path='/dashboard/history' component={History} />
            <Route path='/dashboard/chat' component={Chat} />
            <Switch>
              <Redirect exact from='/dashboard' to='/dashboard/home' />
            </Switch>
          </div>
        }
      </div>
    )
  }
}

export default Interface
