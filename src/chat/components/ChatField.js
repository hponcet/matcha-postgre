import React from 'react'

import ChatEmoji from './ChatEmoji'

import './Chat.css'

class ChatField extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEmoji = this.handleEmoji.bind(this)
  }

  handleChange (event) {
    if (!this.state.value && event.target.value === ' ') return
    this.setState({value: event.target.value})
  }

  handleSubmit (event) {
    event.preventDefault()
    if (!this.state.value) return
    this.props.handleSubmit(this.state.value)
    this.setState({value: ''})
  }

  handleEmoji (emoji) {
    const {value} = this.state
    this.setState({value: `${value}${emoji}`})
    this.chatInput.focus()
  }

  render () {
    return (
      <div className='ChatField__container'>
        <form onSubmit={this.handleSubmit} className='ChatField__formContainer'>
          <input
            ref={(input) => { this.chatInput = input }}
            type='text'
            value={this.state.value}
            onChange={this.handleChange}
            className='ChatField__input'
            placeholder='Écrivez un message...' />
          <ChatEmoji addEmoji={this.handleEmoji} />
        </form>
      </div>
    )
  }
}

export default ChatField
