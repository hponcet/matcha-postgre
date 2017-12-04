import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import LogoutIcon from 'material-ui/svg-icons/action/exit-to-app'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import NavigationOpen from 'material-ui/svg-icons/navigation/menu'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'

import { Link } from 'react-router-dom'

import './Menu.css'

const styles = {
  titleStyle: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
  }

  handleOpenMenu () { this.setState({ menuOpen: true }) }
  handleCloseMenu () { this.setState({ menuOpen: false }) }

  render () {
    const title = <div style={{width: '100px'}}>Matcha</div>

    const profilScore = (
      <div className='Menu__ProfilScore'>
        <div className='Menu__ProfilScore__title'>Popularité</div>
        <div className='Menu__ProfilScore__score'>{this.props.profilScore}</div>
      </div>
    )

    const leftMenuIcon = (
      this.state.menuOpen
      ? <IconButton onClick={this.handleCloseMenu}><NavigationClose /></IconButton>
      : <IconButton onClick={this.handleOpenMenu}><NavigationOpen /></IconButton>
    )

    return (
      <div>
        <AppBar
          title={title}
          titleStyle={styles.titleStyle}
          iconElementLeft={leftMenuIcon}
          iconElementRight={<IconButton><LogoutIcon onClick={this.props.logout} /></IconButton>}
          children={<div>{profilScore}</div>}
        />
        <div>
          <Drawer
            docked={false}
            open={this.state.menuOpen}
            onRequestChange={(menuOpen) => this.setState({menuOpen})}
          >
            <div style={{height: '80px'}} />
            <Divider />
            <Link to='/dashboard'>
              <MenuItem onClick={this.handleClose}>Menu</MenuItem>
            </Link>
            <Divider />
            <MenuItem onClick={this.handleClose}>Rechercher</MenuItem>
            <Divider />
            <MenuItem onClick={this.handleClose}>Mes matchs</MenuItem>
            <Divider />
            <MenuItem onClick={this.handleClose}>Discussions</MenuItem>
            <Divider />
            <Link to='/dashboard/profil'>
              <MenuItem onClick={this.handleClose}>Mon profil</MenuItem>
            </Link>
            <Divider />
          </Drawer>
        </div>
      </div>
    )
  }
}

export default Menu
