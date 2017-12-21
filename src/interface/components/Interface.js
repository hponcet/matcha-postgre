import React from 'react'
import Menu from '../containers/Menu'
import { Switch, Route, Redirect } from 'react-router'
import history from '../../config/history'

import Home from '../../home/containers/Home'
import Profil from '../../profil/containers/Profil'
import Finder from '../../finder/containers/Finder'
import Loading from '../../styled-components/Loading'

import './Interface.css'

class Interface extends React.Component {
  componentWillMount () {
    this.props.fetchProfil()
    this.props.fetchPictures()
    this.props.getProfilPicture()
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.isFetching &&
      nextProps.profil.profilPicture === 'http://localhost:8000/files/assets/empty_avatar.jpg' &&
      this.props.location.pathname !== '/dashboard/profil') history.push('/dashboard/profil?profilPicture=false')
  }

  render () {
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <Menu />
        {
          this.props.isFetching && !this.props.profil.profilId
          ? <Loading />
          : <div className='Home__contentContainer'>
            <Route path='/dashboard/home' component={Home} />
            <Route path='/dashboard/profil' component={Profil} />
            <Route path='/dashboard/finder' component={Finder} />
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
