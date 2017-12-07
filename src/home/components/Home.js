import React from 'react'
import {Card, CardText} from 'material-ui/Card'

class HomeGrid extends React.Component {
  render () {
    return (
      <Card style={{width: '70%', alignSelf: 'center'}}>
        <CardText>
          Bonjour {this.props.pseudo}, ton id est {this.props.id} et {this.props.profilId ? `vous avez un profil.` : 'vous n\'avez pas de profil.'}
        </CardText>
      </Card>
    )
  }
}

export default HomeGrid
