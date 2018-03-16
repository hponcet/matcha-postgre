import React from 'react'
import anime from 'animejs'

import { historyPush } from '../../config/history'

import IconButton from 'material-ui/IconButton'
import LoveIcon from 'mdi-react/HeartIcon'
import MessageIcon from 'mdi-react/CommentTextIcon'

import './ProfilCallToAction.css'

class ProfilCallToAction extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isClicked: false
    }
    this.like = this.like.bind(this)
  }

  componentDidMount () {
    if (this.props.chatId || this.props.liked) this.setState({isClicked: true})
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
    this.setState({isClicked: true})
  }

  render () {
    const { isClicked } = this.state
    const likeCTABtn = () => (
      <IconButton
        style={{ width: '55px', height: '55px' }}
        onClick={this.like}
        disabled={isClicked}
        id='likeIcon'>
        <LoveIcon className={`ProfilCTA__icon ${isClicked ? 'iconRed' : ''}`} />
      </IconButton>
    )
    const messageCTABtn = (
      <div>
        <IconButton
          style={{ width: '55px', height: '55px' }}
          onClick={() => { historyPush(`/dashboard/chat?thread=${chatId}`) }}>
          <MessageIcon className='ProfilCTA__icon' />
        </IconButton>
      </div>
    )
    const { chatId, liked } = this.props
    return (
      <div className='ProfilCTA__container'>
        {chatId || liked ? likeCTABtn(true) : likeCTABtn(false)}
        {chatId ? messageCTABtn : null}
      </div>
    )
  }
}

export default ProfilCallToAction
