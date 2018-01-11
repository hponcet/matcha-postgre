import React from 'react'
import random from 'lodash/random'

import { historyPush } from '../../config/history'

import StackedPictures from './StackedPictures'
import IconLocation from 'material-ui/svg-icons/communication/location-on'
import IconScore from 'material-ui/svg-icons/action/trending-up'

import './ProfilPicture.css'

const styles = {
  leftBtn: {
    position: 'absolute',
    left: '5px',
    top: '200px'
  },
  linkToProfil: {
    position: 'absolute',
    right: '0px',
    left: '0px',
    top: '10px',
    height: '380px',
    zIndex: '9',
    cursor: 'pointer'
  },
  rightBtn: {
    position: 'absolute',
    right: '5px',
    top: '200px'
  }
}

class ProfilPicture extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      profilLoaded: false,
      currentViewerPicture: 0,
      profilIsOpen: false,
      profil: {},
      pictures: [],
      location: []
    }
    this.prevPicture = this.prevPicture.bind(this)
    this.nextPicture = this.nextPicture.bind(this)
    this.openProfil = this.openProfil.bind(this)
    this.closeProfil = this.closeProfil.bind(this)
    this.componentLoadProfil = this.componentLoadProfil.bind(this)
  }

  componentDidMount () {
    this.componentLoadProfil(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.componentLoadProfil(nextProps)
  }

  componentLoadProfil (props) {
    if (props.profil) {
      this.setState({
        profilLoaded: true,
        currentViewerPicture: random(0, props.profil.pictures.length - 1),
        pictures: props.profil.pictures,
        profil: props.profil,
        location: props.profil.location.loc
      })
    }
  }

  openProfil () { this.setState({profilIsOpen: true}) }
  closeProfil () { this.setState({profilIsOpen: false}) }

  prevPicture () {
    if (this.state.currentViewerPicture === 0) {
      return this.setState({currentViewerPicture: this.state.pictures.length - 1})
    }
    this.setState({currentViewerPicture: this.state.currentViewerPicture - 1})
  }
  nextPicture () {
    if (this.state.currentViewerPicture === this.state.pictures.length - 1) {
      return this.setState({currentViewerPicture: 0})
    }
    this.setState({currentViewerPicture: this.state.currentViewerPicture + 1})
  }

  render () {
    const { pictures, location, profil } = this.state
    return this.state.profilLoaded ? (
      <div className='col ProfilPicture__container' onMouseEnter={this.openProfil} onMouseLeave={this.closeProfil}>
        <img className='ProfilPicture__picture' src={profil.profilPicture} alt='' />
        {
          this.state.profilIsOpen
          ? (
            <div className='ProfilPicture__Profil'>
              <div className='Profil__Viewer'>
                <div style={styles.linkToProfil} onClick={() => {
                  historyPush(`/dashboard/profil/${profil._id}/`)
                  this.props.profilView(profil._id)
                }} />
                <StackedPictures pictures={pictures} size={300} />
              </div>
              <div className='Profil__infos'>
                <div className='Profil__infoCol'>
                  <div className='Profil__pseudo'>{profil.pseudo}</div>
                  <div className='Profil__age'>
                    {Number((Date.now() - Date.parse(profil.birthday)) / 31536000000).toFixed(0)} ans
                  </div>
                </div>
                <div className='Profil__infoRow'>
                  <div className='Profil__content'>
                    <IconLocation />
                    {profil.location.city ? `${profil.location.city}, ` : null}
                    {Math.floor(location / 1000)}km
                  </div>
                  <div className='Profil__content'><IconScore />{profil.profilScore}</div>
                </div>
                <div className='Profil__bio'>{profil.biography}</div>
              </div>
            </div>
          )
          : null
          }
      </div>
    ) : null
  }
}

export default ProfilPicture
