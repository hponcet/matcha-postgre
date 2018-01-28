import React from 'react'
import findIndex from 'lodash/findIndex'

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
      currentProfil: null,
      threadsLabels: [],
      profilViewed: null,
      openInfos: false
    }
    this.onSelectThread = this.onSelectThread.bind(this)
    this.urlParamsActions = this.urlParamsActions.bind(this)
    this.handleInfosClose = this.handleInfosClose.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.pictures.length === 0) {
      historyPush('/dashboard/profil?emptypics=1')
    }
    if (!nextProps.fetching && nextProps.threads) {
      this.setState({threadsLabels: nextProps.threads})
      if (nextProps.threads.length > 0 && !this.state.currentThread) {
        this.setState({
          currentThread: nextProps.threads[0].chatId,
          profilViewed: nextProps.threads[0]._id
        })
      }
      if (nextProps.threads.length > 0 && this.state.currentThread) {
        const threadIndex = findIndex(nextProps.threads, (thread) => thread.chatId === this.state.currentThread)
        if (threadIndex > -1) {
          const profilViewed = nextProps.threads[threadIndex]._id
          this.setState({ profilViewed })
        }
      }
      if (nextProps.threads.length === 0) {
        this.setState({openInfos: true})
      }
    }
  }

  componentDidMount () {
    this.props.fetchThreads()
    this.urlParamsActions()
  }

  urlParamsActions () {
    const UrlParams = new URLSearchParams(this.props.location.search)
    if (UrlParams.get('thread')) {
      this.setState({currentThread: UrlParams.get('thread')})
    }
  }

  handleInfosClose () { this.setState({openInfos: false}) }

  onSelectThread (currentThread, profilViewed) {
    this.setState({currentThread, profilViewed})
  }

  render () {
    return (
      <div className='Chat__container'>
        <div className='ChatList'>
          <ChatList
            threads={this.state.threadsLabels}
            currentThread={this.state.currentThread}
            onSelectThread={this.onSelectThread}
          />
        </div>
        <div style={{width: '100%', height: '100%'}}>
          <ChatText
            currentThread={this.state.currentThread}
          />
        </div>
        <div className='ChatProfilPreview' style={{width: '40%', height: '100%'}}>
          <ChatProfilPreview profilId={this.state.profilViewed} />
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
