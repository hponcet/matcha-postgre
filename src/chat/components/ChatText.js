import React from 'react'
import Highlight from 'react-highlight-words'
import map from 'lodash/map'
import without from 'lodash/without'

import ChatField from './ChatField'

import Loading from '../../styled-components/Loading'

import {emojis} from '../assets/emoji'
import './Chat.css'

class ChatText extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      thread: [],
      currentThread: null
    }
    this.sendMessage = this.sendMessage.bind(this)
  }

  componentDidMount () {
    if (this.props.currentThread) {
      this.setState({currentThread: this.props.currentThread})
      this.props.getChat(this.props.currentThread)
    }
  }

  componentDidUpdate () {
    const scrollZone = document.getElementById('scrollZone')
    scrollZone.scrollTop = scrollZone.scrollHeight
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.currentThread && nextProps.currentThread !== this.state.currentThread) {
      this.setState({currentThread: nextProps.currentThread})
      this.props.getChat(nextProps.currentThread)
    }
    if (nextProps.threadContent) {
      this.setState({thread: nextProps.threadContent})
      window.matcha.socket.removeListener(this.state.thread._id)
      window.matcha.socket.on(nextProps.threadContent._id, (message) => {
        let { thread } = this.state
        thread.messages.push(message)
        this.setState({thread})
      })
    }
  }

  sendMessage (content) {
    const message = {
      content: content,
      profilId: this.props.userProfilId,
      destId: without(this.state.thread.profils, this.props.userProfilId)[0],
      chatId: this.state.thread._id,
      date: Date.now()
    }
    this.props.sendMessage(message)
    const {thread} = this.state
    thread.messages.push(message)
    this.setState({thread})
  }

  render () {
    return (
      <div className='ChatText__container'>
        <div className='ChatText__overflow' id='scrollZone'>
          {this.props.fetching
          ? <Loading />
          : <div className='ChatText__messageContainer'>
            {
              map(this.state.thread.messages, (message, index) => {
                return <div
                  key={index}
                  className={`ChatText__message ${this.props.userProfilId === message.profilId ? 'msgRight' : 'msgLeft'}`}>
                  <Highlight
                    highlightClassName='emoji'
                    searchWords={emojis}
                    autoEscape
                    textToHighlight={message.content}
                  />
                </div>
              })
            }
          </div>}
        </div>
        <ChatField
          disable={this.state.thread.length !== 0}
          handleSubmit={this.sendMessage} />
      </div>
    )
  }
}

export default ChatText
