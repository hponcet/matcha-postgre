import React from 'react'
import map from 'lodash/map'

import { historyPush } from '../../config/history'
import { Avatar, Card, CardHeader } from 'material-ui'

class History extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      profilValidated: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.profilFetching && nextProps.pictures.length === 0) {
      historyPush('/dashboard/profil?emptypics=1')
    }
  }

  componentDidMount () {
    this.props.getHistory()
  }

  render () {
    const generateList = (feedObject) => {
      return map(feedObject, (item, index) => {
        if (!item) return
        return <div
          key={index}
          className='NewsFeed__newsContainer'
        >
          <div
            className='NewsFeed__infoContainer'
            onClick={() => { historyPush(item.actionUrl) }}
          >
            <Avatar
              className='NewsFeed__avatar'
              src={item.profilPicture}
              size={40}
            />
            <div className='NewsFeed__sentence'>
              <div>
                <span
                  onClick={() => { historyPush(item.profilUrl) }}
                  className='NewsFeed__pseudoLink'
                >
                  {item.pseudo}
                </span>
                {item.message}
              </div>
            </div>

          </div>
        </div>
      })
    }

    return (
      <div>
        {this.props.history
        ? <div>
          <Card
            style={{marginBottom: '20px'}}
            >
            <CardHeader>Nouvelles activitées</CardHeader>
            {generateList(this.props.news)}
          </Card>
          <Card>
            <CardHeader>Activitées plus anciennes</CardHeader>
            {generateList(this.props.archived)}
          </Card>
        </div>
        : <div>Vous n'avez aucune notification.</div>
        }
      </div>
    )
  }
}

export default History
