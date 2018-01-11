import React from 'react'
import anime from 'animejs'

import IconButton from 'material-ui/IconButton'
import LoveIcon from 'mdi-react/HeartIcon'
import MessageIcon from 'mdi-react/CommentTextIcon'

import './ProfilCallToAction.css'

class ProfilCallToAction extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.like = this.like.bind(this)
  }

  like () {
    this.props.like(this.props.profilId)
    anime({
      targets: '#likeIcon',
      rotate: {
        value: 720,
        duration: 1000,
        easing: 'easeInOutSine'
      },
      scale: {
        value: [2, 1],
        duration: 1000,
        easing: 'easeInOutQuart'
      }
    })
  }

  render () {
    const likeCTABtn = (isClicked) => (
      <IconButton
        style={{ width: '55px', height: '55px' }}
        onClick={this.like}
        disabled={isClicked}
        id='likeIcon'>
        <LoveIcon className={`ProfilCTA__icon ${isClicked ? 'iconRed' : ''}`} />
      </IconButton>
    )
    const messageCTABtn = (
      <div style={{width: '0px'}}>
        <IconButton style={{ width: '55px', height: '55px' }}>
          <MessageIcon className='ProfilCTA__icon' />
        </IconButton>
      </div>
    )
    const { userLikes } = this.props
    return (
      <div className='ProfilCTA__container'>
        {userLikes && userLikes.indexOf(this.props.profilId) !== -1 ? likeCTABtn(true) : likeCTABtn(false)}
        {messageCTABtn}
      </div>
    )
  }
}

export default ProfilCallToAction
