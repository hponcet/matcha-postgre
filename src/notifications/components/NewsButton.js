import React from 'react'
import { historyPush } from '../../config/history'

import NewsFeed from '../containers/NewsFeed'

import IconButton from 'material-ui/IconButton/IconButton'
import IconMenu from 'material-ui/IconMenu'
import Snackbar from 'material-ui/Snackbar'
import Divider from 'material-ui/Divider'
import ActionIcon from 'material-ui/svg-icons/image/remove-red-eye'
import Badge from 'material-ui/Badge'

import './NewsButton.css'

class NewsButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      news: [],
      openNotification: false,
      notification: {}
    }
    this.onActionClick = this.onActionClick.bind(this)
  }
  componentDidMount () {
    this.socketInit()
    this.props.fetchHistory()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.news) this.setState({ news: nextProps.news })
  }

  socketInit () {
    window.matcha.socket.on('notification', (notification) => {
      const news = this.state.news
      news.push(notification)
      this.setState({
        notification: notification,
        openNotification: true,
        news
      })
    })
  }

  onActionClick () {
    historyPush(this.state.actionUrl)
  }
  render () {
    return (
      <div>
        <div
          className='NewsFeed__Button'
          id='NewsFeed-Button'
        >
          <IconMenu
            iconButtonElement={
              <IconButton
                className='NewsFeed__FloatingActionButton'
                iconStyle={{ width: '50px', height: '50px' }}
              >
                <div className='NewsFeed__profilPicture__container'>
                  <img className='NewsFeed__profilPicture' src={this.props.profilPicture} alt='' />
                </div>
              </IconButton>
            }
            iconStyle={{ width: '60px', height: '60px' }}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
          >

            <NewsFeed
              news={this.state.news}
              style={{maxWidth: '500px'}}
            />
            <Divider />
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
              <div
                className='Sign__linkContainer'
                style={{margin: '0', padding: '0', cursor: 'pointer'}}
                onClick={() => { historyPush('/dashboard/history') }}
              >
                Voir l'historique
              </div>
              <div
                className='Sign__linkContainer'
                style={{margin: '0', padding: '0', cursor: 'pointer'}}
                onClick={() => { if (this.props.news.length > 0) this.props.archiveAllNews() }}
              >
                Tout archiver
              </div>
            </div>
          </IconMenu>
          {
            this.state.news.length > 0
            ? <Badge
              className='NewsFeed__badge'
              badgeContent={this.state.news.length}
              badgeStyle={{color: '#002257'}}
            />
            : null
          }
        </div>
        <Snackbar
          open={this.state.openNotification}
          message={`${this.state.notification.pseudo} ${this.state.notification.message}`}
          action={<ActionIcon color='grey' />}
          onActionClick={this.onActionClick}
          autoHideDuration={2000}
          onRequestClose={() => { this.setState({openNotification: false}) }}
        />
      </div>
    )
  }
}

export default NewsButton
