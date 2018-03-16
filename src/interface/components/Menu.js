import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import LogoutIcon from 'material-ui/svg-icons/action/exit-to-app'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import NavigationOpen from 'material-ui/svg-icons/navigation/menu'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import NewsButton from '../../notifications/containers/NewsButton'
import history, { historyPush } from '../../config/history'

import './Menu.css'

const styles = {
  titleStyle: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  linkStyle: {
    textDecoration: 'none'
  }
}

class Menu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      menuOpen: false
    }
    this.handleOpenMenu = this.handleOpenMenu.bind(this)
    this.handleCloseMenu = this.handleCloseMenu.bind(this)
    this.changePath = this.changePath.bind(this)
  }

  handleOpenMenu () { this.setState({ menuOpen: true }) }
  handleCloseMenu () { this.setState({ menuOpen: false }) }

  changePath (path) {
    this.handleCloseMenu()
    historyPush(path)
  }

  render () {
    const title = <div style={{width: '100px'}}>Matcha</div>

    const profilScore = (
      <div className='Menu__ProfilScore'>
        <div className='Menu__ProfilScore__title'>Popularité</div>
        <div className='Menu__ProfilScore__score'>{this.props.profil.score}</div>
      </div>
    )

    const leftMenuIcon = (
      this.state.menuOpen
      ? <IconButton onClick={this.handleCloseMenu}><NavigationClose /></IconButton>
      : <IconButton onClick={this.handleOpenMenu}><NavigationOpen /></IconButton>
    )

    const CTAMenu = (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}>
        <NewsButton />
        <div>{profilScore}</div>
        <IconButton><LogoutIcon color='white' onClick={this.props.logout} /></IconButton>
      </div>
    )

    return (
      <div>
        <AppBar
          title={title}
          titleStyle={styles.titleStyle}
          iconElementLeft={leftMenuIcon}
          children={CTAMenu}
          style={{backgroundColor: '#79A5C5'}}
        />
        <div>
          <Drawer
            docked={false}
            open={this.state.menuOpen}
            onRequestChange={(menuOpen) => this.setState({menuOpen})}
            overlayStyle={{backgroundColor: 'none'}}
          >
            <div style={{height: '80px'}} />
            <MenuItem
              style={history.location.pathname === '/dashboard/home'
                ? {backgroundColor: '#79A5C5', color: '#ffffff'} : null}
              onClick={() => { this.changePath('/dashboard/home') }}>
              Dashboard
            </MenuItem>
            <MenuItem
              style={history.location.pathname === '/dashboard/finder'
                ? {backgroundColor: '#79A5C5', color: '#ffffff'} : null}
              onClick={() => { this.changePath('/dashboard/finder') }}>
              Rechercher
            </MenuItem>
            <MenuItem
              style={history.location.pathname === '/dashboard/history'
                ? {backgroundColor: '#79A5C5', color: '#ffffff'} : null}
              onClick={() => { this.changePath('/dashboard/history') }}>
              Historique
            </MenuItem>
            <MenuItem
              style={history.location.pathname === '/dashboard/chat'
                ? {backgroundColor: '#79A5C5', color: '#ffffff'} : null}
              onClick={() => { this.changePath('/dashboard/chat') }}>
              Mes matchs
            </MenuItem>
            <MenuItem
              style={history.location.pathname === '/dashboard/profil'
                ? {backgroundColor: '#79A5C5', color: '#ffffff'} : null}
              onClick={() => { this.changePath('/dashboard/profil') }}>
              Mon profil
            </MenuItem>
          </Drawer>
        </div>
      </div>
    )
  }
}

export default Menu
