import React from 'react'
import map from 'lodash/map'
import { historyPush } from '../../config/history'

import StackedPictures from './StackedPictures'
import ProfilCallToAction from '../containers/ProfilCallToAction'
import Loading from '../../styled-components/Loading'
import Chip from 'material-ui/Chip'
import { Card } from 'material-ui/Card'

import IconLocation from 'material-ui/svg-icons/communication/location-on'
import IconScore from 'material-ui/svg-icons/action/trending-up'

import './ProfilView.css'

class ProfilView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.props.match.params.userId
    ? this.props.getProfil(this.props.match.params.userId)
    : historyPush('/dashboard/finder')
  }

  render () {
    const {profil} = this.props
    return (
      !this.props.profil.isFetching
      ? <Card style={{minWidth: '450px', width: '70%', alignSelf: 'center'}}>
        <div className='Profil__profilPicture__container Profil__infoCol'>
          <StackedPictures pictures={this.props.profil.pictures} />
          <ProfilCallToAction profilId={profil.id} />
          <div className='Profil__infoCol'>
            <div className='ProfilView__pseudo'>{profil.pseudo}</div>
            <div className='Profil__age'>
              {Number((Date.now() - Date.parse(profil.birthday)) / 31536000000).toFixed(0)} ans
            </div>
          </div>
          <div className='Profil__infoRow'>
            <div className='Profil__content'>
              <IconLocation />
              {profil.location.city ? `${profil.location.city}` : null}
              {profil.distance ? ', ' + Math.round(profil.distance) + 'km' : null}
            </div>
            <div className='Profil__content'><IconScore />{profil.score}</div>
          </div>
          <div className='ProfilView__bio'>{profil.biography}</div>
          <div className='ProfilView__tags'>{
            map(profil.tags, (tag, index) => {
              return <Chip
                backgroundColor='#79A5C5'
                labelColor='#ffffff'
                style={{margin: '4px'}}
                key={index}>
                {tag}
              </Chip>
            })}</div>
        </div>
      </Card>
      : <Loading />
    )
  }
}

export default ProfilView
