import React from 'react'
import map from 'lodash/map'

import { IconButton, IconMenu } from 'material-ui'
import EmojiIcon from 'material-ui/svg-icons/editor/insert-emoticon'

import './Chat.css'
import {emojis} from '../assets/emoji'

class ChatEmoji extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
    this.close = this.close.bind(this)
    this.open = this.open.bind(this)
  }

  close () { this.setState({open: false}) }
  open () { this.setState({open: true}) }

  render () {
    const iconsPanel = (
      <div className='ChatEmoji__container'>
        <div className='ChatEmoji__emojiPanel'>
          {
            map(emojis, (emoji, index) => <div
              key={index}
              className='ChatEmoji__emoji'
              onClick={() => {
                this.props.addEmoji(emoji)
                this.close()
              }}
            >{emoji}</div>
            )
          }
        </div>
      </div>
    )
    return (
      <div>
        <IconMenu
          menuStyle={{
            width: '30%',
            minWidth: '50px',
            height: '30%',
            display: 'flex'
          }}
          iconButtonElement={
            <IconButton onClick={this.open}>
              <EmojiIcon color='grey' />
            </IconButton>
          }
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          open={this.state.open}
          onRequestChange={this.close}
        >
          {iconsPanel}
        </IconMenu>
      </div>
    )
  }
}

export default ChatEmoji
