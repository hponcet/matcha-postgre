import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import LogoutIcon from 'material-ui/svg-icons/action/exit-to-app'

const styles = {
  titleStyle: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

class Menu extends React.Component {
  render () {
    const title = <div style={{width: '100px'}}>Matcha</div>
    return (
      <div>
        <AppBar
          title={title}
          titleStyle={styles.titleStyle}
          iconElementRight={<IconButton><LogoutIcon onClick={this.props.logout} /></IconButton>}
          children={<div>{this.props.pseudo}</div>}
        />
      </div>
    )
  }
}

export default Menu
