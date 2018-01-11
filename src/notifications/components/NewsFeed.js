import React from 'react'
import map from 'lodash/map'
import { historyPush } from '../../config/history'

import Link from 'react-router-dom/Link'
import IconButton from 'material-ui/IconButton/IconButton'
import Avatar from 'material-ui/Avatar'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'

import './NewsButton.css'

class NewsFeed extends React.Component {
  render () {
    const itemOptions = (notification) => (
      <div
        style={{width: '50px', display: 'flex', alignSelf: 'center'}}>
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          anchorOrigin={{horizontal: 'left', vertical: 'center'}}
          targetOrigin={{horizontal: 'left', vertical: 'center'}}
        >
          <MenuItem primaryText='Archiver' onClick={() => { this.props.archiveNews(notification._id) }} />
          <MenuItem
            primaryText='Voir'
            onClick={() => {
              this.props.archiveNews(notification._id)
              historyPush(notification.actionUrl)
            }}
          />
          <MenuItem
            primaryText='Voir le profil'
            onClick={() => {
              this.props.archiveNews(notification._id)
              historyPush(notification.profilUrl)
            }}
          />
        </IconMenu>
      </div>
    )

    const { news } = this.props

    return news.length > 0
      ? <div className='NewsFeed__overflow'>
        {
          map(news, (notification, index) => {
            return (
              <div
                key={index}
                className='NewsFeed__newsContainer'
              >
                <div
                  className='NewsFeed__infoContainer'
                  onClick={() => {
                    this.props.archiveNews(notification._id)
                    historyPush(notification.actionUrl)
                  }}
                >
                  <Avatar
                    className='NewsFeed__avatar'
                    src={notification.profilPicture}
                    size={40}
                  />
                  <div className='NewsFeed__sentence'>
                    <div>
                      <Link
                        to={notification.profilUrl}
                        className='NewsFeed__pseudoLink'
                        onClick={() => { this.props.archiveNews(notification._id) }}
                      >
                        {notification.pseudo}
                      </Link>
                      {notification.message}
                    </div>
                  </div>

                </div>
                {itemOptions(notification)}
              </div>
            )
          })
        }
      </div>
      : <div className='NewsFeed__emptyNews'>Aucune notification</div>
  }
}

export default NewsFeed
