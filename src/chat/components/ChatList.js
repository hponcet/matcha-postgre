import React from 'react'
import map from 'lodash/map'

import Avatar from 'material-ui/Avatar'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Card from 'material-ui/Card'

class ChatList extends React.Component {
  render () {
    const { chatId } = this.props

    return (
      <Card style={{width: '100%', height: '100%'}}>
        <List>
          <Subheader>Discutions récentes</Subheader>
          {
            map(this.props.threads, (thread, index) => {
              return (
                <ListItem
                  leftAvatar={<Avatar src={thread.profilPicture} />}
                  key={index}
                  onClick={() => { this.props.onSelectThread(thread.chatId) }}
                  style={{
                    color: chatId === thread.chatId
                    ? '#ffffff' : 'inherit',
                    backgroundColor: chatId === thread.chatId
                    ? '#79A5C5' : 'inherit'
                  }}
                >
                  {thread.pseudo}
                </ListItem>
              )
            })
          }
        </List>
      </Card>
    )
  }
}

export default ChatList
