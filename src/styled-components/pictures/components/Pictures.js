import React from 'react'
import AddIcon from 'material-ui/svg-icons/content/add'
import Dialog from 'material-ui/Dialog'
import PictureEdit from './PictureEdit'

import './Pictures.css'

class Pictures extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      currentPictureData: {
        data: null,
        index: 0
      },
      pictures: []
    }
    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.getCroppedPicture = this.getCroppedPicture.bind(this)
  }

  handleDialogOpen () { this.setState({open: true}) }
  handleDialogClose () { this.setState({open: false}) }

  getCroppedPicture (picture, index) {
    const pictures = this.state.pictures
    pictures.push(picture)
    this.setState({pictures})
    this.handleDialogClose()
  }

  getNewPicture (event, index) {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.addEventListener('load', () => {
      this.setState({ currentPictureData: reader.result, open: true })
    }, false)

    if (file) reader.readAsDataURL(file)
  }

  render () {
    const pictures = this.state.pictures.map((picture, index) => <img key={index} className='pictures__picture' src={picture} alt='' />)
    console.log(pictures.length)

    const emptyPicture = (
      <div className='pictures__emptyPictures'>
        <input
          type='file'
          className='pictures__inputs'
          onChange={(event) => { this.getNewPicture(event) }}
        />
        <AddIcon className='pictures__addIcon' color='grey' />
      </div>
    )

    return (
      <div className='pictures__container'>
        {pictures}
        {pictures.length < 5 ? emptyPicture : null}
        <Dialog
          modal
          open={this.state.open}
        >
          <PictureEdit
            picture={this.state.currentPictureData}
            closeDialog={() => this.handleDialogClose()}
            getCroppedPicture={this.getCroppedPicture}
          />
        </Dialog>
      </div>
    )
  }
}

export default Pictures
