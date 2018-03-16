import React from 'react'
import forEach from 'lodash/forEach'
import { historyPush } from '../../config/history'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import ChatList from './ChatList'
import ChatText from '../containers/ChatText'
import ChatProfilPreview from '../../profil/containers/ProfilChatPreview'

class Chat extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentThread: null,
      openInfos: false
    }
    this.onSelectThread = this.onSelectThread.bind(this)
    this.parseUrlParams = this.parseUrlParams.bind(this)
    this.handleInfosClose = this.handleInfosClose.bind(this)
  }

  componentDidMount () {
    this.props.fetchThreads()
    this.parseUrlParams()
  }

  parseUrlParams () {
    const UrlParams = new URLSearchParams(this.props.location.search)
    const chatId = UrlParams.get('thread')
    if (chatId) this.onSelectThread(chatId)
  }

  handleInfosClose () { this.setState({openInfos: false}) }

  onSelectThread (chatId) {
    forEach(this.props.threads, (thread, index) => {
      if (thread.chatId === chatId) {
        this.setState({currentThread: thread, chatId})
        this.props.getCurrentThread(chatId)
      }
    })
  }

  render () {
    const { currentThread } = this.state
    const { threads, thread, userId } = this.props

    return (
      <div className='Chat__container'>
        <div className='ChatList'>
          <ChatList
            threads={threads}
            chatId={currentThread ? currentThread.chatId : null}
            onSelectThread={this.onSelectThread}
          />
        </div>
        <div style={{width: '100%', height: '100%'}}>
          <ChatText
            thread={thread}
            threadInfo={currentThread}
            userId={userId}
          />
        </div>
        <div className='ChatProfilPreview' style={{width: '40%', height: '100%'}}>
          {/* <ChatProfilPreview profilId={threads && threads.length > currentThread ? threads[currentThread].id : null} /> */}
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
