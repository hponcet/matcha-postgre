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

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }
  componentWillMount () {
    this.props.fetchUser()
  }

  componentDidMount () {
    this.props.user && !this.props.user.profil ? this.setState({open: true}) : this.setState({open: false})
  }

  handleOpen () { this.setState({open: true}) }
  handleClose () { this.setState({open: false}) }

  render () {
    const title = <div style={{width: '100px'}}>Matcha</div>

    return (
      <div>
        <AppBar
          title={title}
          titleStyle={styles.titleStyle}
          iconElementRight={<IconButton><LogoutIcon onClick={this.props.logout} /></IconButton>}
        />
      </div>
    )
  }
}

export default App
