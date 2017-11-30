import React from 'react'
import AvatarEditor from 'react-avatar-editor'

import Slider from 'material-ui/Slider'
import RaisedButton from 'material-ui/RaisedButton/RaisedButton'
import IconButton from 'material-ui/IconButton'
import CircularProgress from 'material-ui/CircularProgress'

import ZoomInIcon from 'material-ui/svg-icons/action/zoom-in'
import ZoomOutIcon from 'material-ui/svg-icons/action/zoom-out'
import RotateRightIcon from 'material-ui/svg-icons/image/rotate-right'
import RotateLeftIcon from 'material-ui/svg-icons/image/rotate-left'
import DoneIcon from 'material-ui/svg-icons/action/done'
import CancelIcon from 'material-ui/svg-icons/navigation/cancel'

import './PictureEdit.css'

const style = {
  actionIcon: {
    width: '30px',
    height: '30px',
    cursor: 'pointer'
  }
}

class PictureEdit extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      onSubmit: false,
      croppedImage: null,
      rotate: 0,
      scale: 1.4
    }
    this.handleScale = this.handleScale.bind(this)
    this.rotateLeft = this.rotateLeft.bind(this)
    this.rotateRight = this.rotateRight.bind(this)
    this.zoomPlus = this.zoomPlus.bind(this)
    this.zoomMinus = this.zoomMinus.bind(this)
  }

  handleScale (event, value) { this.setState({scale: value}) }
  setEditor (ref) { this.editor = ref }
  handleSubmit () {
    this.setState({onSubmit: true})
    const pictureToData = this.editor.getImage()
    pictureToData.toBlob((pictureToBlob) => {
      this.props.getCroppedPicture(pictureToBlob, this.props.index)
    })
  }

  rotateLeft () { this.state.rotate <= 0 ? this.setState({rotate: 270}) : this.setState({rotate: this.state.rotate - 90}) }
  rotateRight () { this.state.rotate >= 270 ? this.setState({rotate: 0}) : this.setState({rotate: this.state.rotate + 90}) }
  zoomPlus () { if (this.state.scale < 1.8) this.setState({scale: this.state.scale + 0.1}) }
  zoomMinus () { if (this.state.scale > 1) this.setState({scale: this.state.scale - 0.1}) }

  render () {
    return (
      <div className='PictureEdit__container'>
        <AvatarEditor
          image={this.props.picture}
          width={400}
          height={400}
          border={50}
          color={[255, 255, 255, 0.6]}
          scale={this.state.scale}
          rotate={this.state.rotate}
          ref={(ref) => this.setEditor(ref)}
        />
        <div className='PictureEdit__rowContainer'>
          <IconButton tooltip={`Zoom -`} iconStyle={style.actionIcon} onClick={this.zoomMinus}>
            <ZoomOutIcon color='grey' />
          </IconButton>
          <Slider
            className='PictureEdit__slider'
            value={this.state.scale}
            onChange={this.handleScale}
            min={1}
            max={1.8} />
          <IconButton tooltip={`zoom +`} iconStyle={style.actionIcon} onClick={this.zoomPlus}>
            <ZoomInIcon color='grey' />
          </IconButton>
        </div>
        <div className='PictureEdit__rowContainer'>
          <IconButton tooltip={`Faire pivoter l'image a gauche`} iconStyle={style.actionIcon} onClick={this.rotateLeft}>
            <RotateLeftIcon color='grey' />
          </IconButton>
          <IconButton tooltip={`Faire pivoter l'image a droite`} iconStyle={style.actionIcon} onClick={this.rotateRight}>
            <RotateRightIcon color='grey' />
          </IconButton>
        </div>
        <div className='PictureEdit__rowContainer' style={{width: '200px', justifyContent: 'space-between', alignSelf: 'flex-start'}}>
          <RaisedButton
            onClick={() => { this.handleSubmit() }}
            icon={!this.state.onSubmit ? <DoneIcon color='grey' /> : null}
            style={{color: 'grey'}}
            disabled={this.state.onSubmit}
          >
            {!this.state.onSubmit ? 'Valider' : <CircularProgress size={60} />}
          </RaisedButton>
          <RaisedButton style={{color: 'grey'}} onClick={() => { this.props.closeDialog() }} icon={<CancelIcon color='grey' />}>
            Annuler
          </RaisedButton>
        </div>
      </div>
    )
  }
}

export default PictureEdit
