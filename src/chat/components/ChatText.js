import React from 'react'
import Highlight from 'react-highlight-words'
import map from 'lodash/map'

import ChatField from './ChatField'
import Loading from '../../styled-components/Loading'
import {emojis} from '../assets/emoji'
import './Chat.css'

class ChatText extends React.Component {
  constructor (props) {
    super(props)
    this.sendMessage = this.sendMessage.bind(this)
    this.state = {
      messages: [],
      chatId: null
    }
  }

  componentWillReceiveProps (nextProps) {
    const { thread, threadInfo } = nextProps
    if (threadInfo && threadInfo.chatId !== this.state.chatId) {
      this.setState({messages: []})

      this.state.chatId && window.matcha.socket.removeListener(this.state.chatId)
      window.matcha.socket.on(threadInfo.chatId, (message) => {
        let { messages } = this.state
        messages.push(message)
        this.setState({messages})
      })
      this.setState({chatId: threadInfo.chatId})
    }
    if (thread) this.setState({messages: thread.messages})
  }

  componentDidUpdate () {
    const scrollZone = document.getElementById('scrollZone')
    scrollZone.scrollTop = scrollZone.scrollHeight
  }

  sendMessage (content) {
    const { userId, threadInfo } = this.props

    const message = {
      message: content,
      destId: threadInfo.id,
      id: userId,
      chatId: threadInfo.chatId,
      date: Date.now()
    }
    this.props.sendMessage(message)
    const { messages } = this.state
    messages.push(message)
    this.setState({ messages })
  }

  render () {
    const { fetching, userId, threadInfo } = this.props
    const { messages } = this.state

    return (
      <div className='ChatText__container'>
        <div className='ChatText__overflow' id='scrollZone'>
          {
            fetching
            ? <Loading />
            : <div className='ChatText__messageContainer'>
              {
                map(messages, (message, index) => {
                  return <div
                    key={index}
                    className={`ChatText__message ${userId === message.id ? 'msgRight' : 'msgLeft'}`}>
                    <Highlight
                      highlightClassName='emoji'
                      searchWords={emojis}
                      autoEscape
                      textToHighlight={message.message}
                    />
                  </div>
                })
              }
            </div>
          }
        </div>
        <ChatField
          disabled={!threadInfo || !threadInfo.chatId || threadInfo.chatFetching}
          handleSubmit={this.sendMessage} />
      </div>
    )
  }
}

export default ChatText
