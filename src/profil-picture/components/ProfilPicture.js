import React from 'react'
import random from 'lodash/random'
import haversine from 'haversine'

import { Link } from 'react-router-dom'

import IconButton from 'material-ui/IconButton/IconButton'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
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
    right: '50px',
    left: '50px',
    top: '10px',
    height: '380px',
    zIndex: '5'
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
      pictures: [],
      location: [],
      userLocation: []
    }
    this.prevPicture = this.prevPicture.bind(this)
    this.nextPicture = this.nextPicture.bind(this)
    this.openProfil = this.openProfil.bind(this)
    this.closeProfil = this.closeProfil.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.profil && nextProps.profil.location) {
      this.setState({
        profilLoaded: true,
        currentViewerPicture: random(0, nextProps.profil.pictures.length - 1),
        pictures: nextProps.profil.pictures,
        location: nextProps.profil.location.loc
      })
    }
    if (nextProps.userProfil) {
      this.setState({
        userLocation: nextProps.userProfil.location.loc
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
    const { profil } = this.props
    const { pictures, location, userLocation } = this.state
    return this.state.profilLoaded ? (
      <div className='col ProfilPicture__container' onMouseEnter={this.openProfil} onMouseLeave={this.closeProfil}>
        <img className='ProfilPicture__picture' src={profil.profilPicture} alt='' />
        {
          this.state.profilIsOpen
          ? (
            <div className='ProfilPicture__Profil'>
              <div className='Profil__Viewer'>
                <IconButton style={styles.leftBtn} onClick={this.prevPicture}><ChevronLeft color='white' /></IconButton>
                <Link style={styles.linkToProfil} to={`/dashboard/profil/${profil._id}/`} />
                <img className='Viewer__picture' src={pictures[this.state.currentViewerPicture]} alt='' />
                <IconButton style={styles.rightBtn} onClick={this.nextPicture}><ChevronRight color='white' /></IconButton>
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
                    {Math.floor(haversine(location, userLocation, {format: '[lat,lon]'}))}km
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
