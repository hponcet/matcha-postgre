import React from 'react'
import forEach from 'lodash/forEach'
import { historyPush } from '../../config/history'
import URLSearchParams from 'url-search-params'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import ChatList from './ChatList'
import ChatText from '../containers/ChatText'
import ChatProfilPreview from '../../profil/containers/ProfilChatPreview'

class Chat extends React.Component {
  constructor (props) {
    super(props)
    this.onSelectThread = this.onSelectThread.bind(this)
    this.handleInfosOpen = this.handleInfosOpen.bind(this)
    this.handleInfosClose = this.handleInfosClose.bind(this)
    this.state = {
      openInfos: false,
      currentInfoThread: null,
      chatId: null
    }
  }

  componentDidMount () {
    this.props.fetchThreads()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.threads && !this.state.chatId) {
      const chatId = new URLSearchParams(this.props.location.search).get('thread')

      if (chatId) {
        this.setState({chatId})
        this.onSelectThread(nextProps.threads, chatId)
      } else if (nextProps.threads && nextProps.threads.length > 0 && nextProps.threads[0].chatId) {
        this.setState({chatId: nextProps.threads[0].chatId})
        this.onSelectThread(nextProps.threads, nextProps.threads[0].chatId)
      } else {
        this.handleInfosOpen()
      }
    }
  }

  handleInfosClose () { this.setState({openInfos: false}) }
  handleInfosOpen () { this.setState({openInfos: true}) }

  onSelectThread (threads, chatId) {
    forEach(threads, (thread, index) => {
      if (thread.chatId === chatId) {
        this.setState({currentInfoThread: thread, chatId})
        this.props.getThread(chatId)
      }
    })
  }

  render () {
    const { chatId, currentInfoThread } = this.state
    const { threads, thread, userId } = this.props

    return (
      <div className='Chat__container'>
        <div className='ChatList'>
          <ChatList
            threads={threads}
            chatId={chatId}
            onSelectThread={(chatId) => { this.onSelectThread(this.props.threads, chatId) }}
          />
        </div>
        <div style={{width: '100%', height: '100%'}}>
          <ChatText
            thread={thread}
            threadInfo={currentInfoThread}
            userId={userId}
          />
        </div>
        <div className='ChatProfilPreview' style={{width: '40%', height: '100%'}}>
          <ChatProfilPreview profilId={currentInfoThread && currentInfoThread.id} />
        </div>
        <Dialog
          title={`Vous n'avez encore pas de matchs`}
          actions={<FlatButton
            label='Ok'
            primary
            keyboardFocused
            onClick={() => {
              this.handleInfosClose()
              historyPush('/dashboard/finder')
            }}
          />}
          modal={false}
          open={this.state.openInfos}
          onRequestClose={this.handleInfosClose}
        >
          Vous n'avez encore pas trouvé l'âme soeur ?<br />
          Nous allons vous emmener vers la page de recherche pour que vous puissiez faire de grandes rencontres.
        </Dialog>
      </div>
    )
  }
}

export default Chat
