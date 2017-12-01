import React from 'react'
import Dialog from 'material-ui/Dialog'

import IconDelete from 'material-ui/svg-icons/action/delete-forever'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import IconOpen from 'material-ui/svg-icons/action/open-in-new'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'

import './Picture.css'

const styles = {
  smallRight: {
    position: 'absolute',
    zIndex: 10,
    right: '10px',
    bottom: '10px',
    width: 30,
    height: 30,
    padding: 3
  },
  smallLeft: {
    position: 'absolute',
    zIndex: 10,
    left: '10px',
    bottom: '10px',
    width: 30,
    height: 30,
    padding: 3
  },
  smallCenter: {
    position: 'absolute',
    zIndex: 10,
    left: 0,
    right: 0,
    margin: '0 auto',
    bottom: '10px',
    width: 30,
    height: 30,
    padding: 3
  },
  smallIcon: {
    width: 25,
    height: 25,
    color: 'lightgrey'
  }
}

class Picture extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen () { this.setState({open: true}) }
  handleClose () { this.setState({open: false}) }

  render () {
    const {src, index} = this.props
    const DeleteButton = (
      <IconButton
        iconStyle={styles.smallIcon}
        style={styles.smallRight}
        tooltip='Supprimer cette photo'
        touch
        tooltipPosition='bottom-center'
        onClick={() => { this.props.deletePicture(src, index) }}
      ><IconDelete /></IconButton>
    )
    const ProfilPictureButton = (
      <IconButton
        iconStyle={styles.smallIcon}
        style={styles.smallLeft}
        tooltip='Photo de profil'
        touch
        tooltipPosition='bottom-center'
      ><ActionGrade /></IconButton>
    )

    const SeePictureButton = (
      <IconButton
        onClick={this.handleOpen}
        iconStyle={styles.smallIcon}
        style={styles.smallCenter}
        tooltip='Voir la photo'
        touch
        tooltipPosition='bottom-center'
      ><IconOpen /></IconButton>
    )

    const ActionToCall = (
      <div
        className='pictures__ActionToCall'>
        {ProfilPictureButton}
        {SeePictureButton}
        {DeleteButton}
      </div>
    )

    const modalActions = [
      <FlatButton
        label='Fermer'
        primary
        onClick={this.handleClose}
      />
    ]

    return (
      <div className='pictures__pictureContainer'>
        {ActionToCall}
        <img className='pictures__picture' src={src} alt='' />
        <Dialog
          onRequestClose={this.handleClose}
          open={this.state.open}
          actions={modalActions}
          bodyStyle={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}
        >
          <img style={{width: '90%'}} alt='' src={src} />
        </Dialog>
      </div>
    )
  }
}

export default Picture
