import React from 'react'
import config from '../../config/config'
import history from '../../config/history'
import { getToken } from '../../authentification/utils'

import { Link } from 'react-router-dom'

import './Showcase.css'

class Showcase extends React.Component {
  componentWillMount () {
    if (getToken()) history.push('/dashboard/home')
  }
  render () {
    const leftBubble = (nb) => {
      let bubble = []
      for (let index = 0; index < nb; index++) {
        bubble.push(<div key={`bubblel_${nb * Date.now() / index}`} className='bubble__write bubble__writeLeft' />)
      }
      return (
        <div className='Showcase__bubble bubble__left'>
          {bubble}
          <div className='bubble__writeEnd bubble__writeLeft' />
        </div>
      )
    }

    const rightBubble = (nb) => {
      let bubble = []
      for (let index = 0; index < nb; index++) {
        bubble.push(<div key={`bubbler_${nb * Date.now() / index}`} className='bubble__write bubble__writeRight' />)
      }
      return (
        <div className='Showcase__bubble bubble__right'>
          {bubble}
          <div className='bubble__writeEnd bubble__writeRight' />
        </div>
      )
    }

    return (
      <div className='Showcase__body'>
        <div className='Showcase__leftPart'>
          <Link className='Showcase__btn login-btn' to='/login'>Connection</Link>
          <Link className='Showcase__btn signup-btn' to='/signup'>Créer un compte</Link>
        </div>
        <div className='Showcase__rightPart'>
          <div className='Showcase__dialog'>
            {rightBubble(2)}
            {leftBubble(1)}
            {rightBubble(3)}
            {leftBubble(2)}
            {rightBubble(2)}
          </div>
          <div className='Showcase__content'>
            <img className='Showcase__banniere' alt='' src={`${config.API_BASE_URI}/files/assets/backgroud_showcase.jpg`} />
          </div>
        </div>
      </div>
    )
  }
}

export default Showcase
