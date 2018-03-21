import React from 'react'
import TextField from 'material-ui/TextField'
import { CardText, CardHeader } from 'material-ui/Card'
import './ProfilView.css'

class ProfilView extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      address: '',
      geoCode: []
    }
  }

  handleChange (value) { this.setState({address: value}) }

  render () {
    return (
      <div>
        <CardHeader
          style={{backgroundColor: '#79A5C5', color: '#ffffff'}}
          actAsExpander
          showExpandableButton
        >
          Localisation
        </CardHeader>
        <CardText expandable>
          <TextField
            type='address'
            hintText='Choisir une adresse'
            name='address'
            value={this.state.address}
            onChange={this.handleChange}
          />
          <div className='Sign__inputsRowContainer'>
            
          </div>
        </CardText>
      </div>
    )
  }
}

export default ProfilView
