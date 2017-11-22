import React from 'react'
import {Card, CardText} from 'material-ui/Card'

class HomeGrid extends React.Component {
  render () {
    return (
      <div>
        <Card>
          <CardText>
            Bonjour {this.props.pseudo}, ton id est {this.props.id} et {this.props.profil ? `vous avez un profil.` : 'vous n\'avez pas de profil.'}
          </CardText>
        </Card>
      </div>
    )
  }
}

export default HomeGrid
