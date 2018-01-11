import React from 'react'
import AddIcon from 'material-ui/svg-icons/content/add'
import Dialog from 'material-ui/Dialog'
import PictureEdit from './PictureEdit'
import Picture from '../containers/Picture'

import './Pictures.css'

class Pictures extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isUploading: true,
      open: false,
      error: '',
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
  resetInput () { this.refs.uploadPictureInput.value = '' }

  getCroppedPicture (picture, index) {
    const data = new FormData()

    data.append('picture', new Blob([picture], {type: 'image/png'}))
    data.append('index', index)

    this.props.uploadPicture(data)
    this.resetInput()
    this.handleDialogClose()
  }

  checkMimeType (picture) {
    const error = 'Veuillez choisir une image [jpeg|png|bmp]'
    const mimeType = picture.split(',')[0].split(':')[1].split(';')[0]
    const mime = mimeType.split('/')[0]
    const type = mimeType.split('/')[1]
    if (mime !== 'image' || (type !== 'png' && type !== 'jpeg' && type !== 'jpg' && type !== 'bmp')) {
      this.setState({error})
      return true
    }
    return false
  }

  getNewPicture (event, index) {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.addEventListener('load', () => {
      const picture = reader.result
      if (this.checkMimeType(picture)) return this.resetInput()
      this.setState({ currentPictureData: {data: picture, index}, open: true })
    }, false)

    if (file) reader.readAsDataURL(file)
  }

  render () {
    const { pictures } = this.props

    const userPictures = !pictures ? [] : pictures.map((picture, index) => {
      return <Picture key={index} index={index} src={picture} />
    })

    const emptyPicture = (
      <div className='pictures__emptyPictures'>
        <input
          type='file'
          ref='uploadPictureInput'
          className='pictures__inputs'
          onChange={(event) => { this.getNewPicture(event, pictures.length) }}
          onClick={() => { this.setState({error: ''}) }}
        />
        <AddIcon className='pictures__addIcon' color='grey' />
      </div>
    )

    return (
      <div className='pictures__container'>
        {userPictures}
        {userPictures.length < 5 ? emptyPicture : null}
        <Dialog
          modal
          open={this.state.open}
        >
          <PictureEdit
            picture={this.state.currentPictureData.data}
            index={this.state.currentPictureData.index}
            closeDialog={() => this.handleDialogClose()}
            getCroppedPicture={this.getCroppedPicture}
          />
        </Dialog>
        <div>{this.state.error}</div>
      </div>
    )
  }
}

export default Pictures
