import React from 'react'
import { Card, CardText } from 'material-ui/Card'

class HomeGrid extends React.Component {
  render () {
    return (
      <Card style={{width: '70%', alignSelf: 'center'}}>
        <CardText>
          Bonjour {this.props.profil.pseudo}, ton id est {this.props.profil.id}
        </CardText>
      </Card>
    )
  }
}

export default HomeGrid
