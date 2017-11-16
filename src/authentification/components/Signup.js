import React from 'react'
import { Card, CardHeader, CardText, CardActions } from '../../styled-components/Cards'
import RaisedButton from 'material-ui/RaisedButton'
import { Input } from '../../styled-components/Inputs'

import './Signup.css'

class Signup extends React.Component {
  state = {
    canSubmit: false,
    inputs: {},
  }
  enableButton () { this.setState({canSubmit: true}) }
  disableButton () { this.setState({canSubmit: false}) }

  getInputsValue (props) {
    if (!props.name) return
    const inputs = this.state.inputs

    inputs[props.name] = props.value
    this.setState({inputs})
    
  }

  handleSubmit () {
    console.log('sended')
    // this.props.signup(
    //   values.email,
    //   values.password,
    //   values.type,
    //   values.firstName,
    //   values.lastName
    // )
  }

  render () {
    return (
      <div>
        <Card style={{width: '500px'}}>
          <CardHeader>Créer mon profil</CardHeader>
            <CardText>
              <div className='Signup__inputsColumnContainer'>
                <div className='Signup__inputsRowContainer'>
                  <Input
                    type='text'
                    hintText='Prénom'
                    name='firstName'
                    stateComponent={this.getInputsValue.bind(this)}
                    width='47%'
                  />
                  <Input
                    type='text'
                    hintText='Nom'
                    name='lastName'
                    stateComponent={this.getInputsValue.bind(this)}
                    width='47%'
                  />
                </div>
                <Input
                  type='email'
                  hintText='Email *'
                  error='Veuillez saisir un E-mail'
                  name='email'
                  rules={{
                    isEmail: true,
                    required: true
                  }}
                  fullWidth
                  stateComponent={this.getInputsValue.bind(this)}
                />
                <Input
                  type='text'
                  hintText='Pseudo *'
                  error='Veuillez saisir un Pseudo (sans espace)'
                  name='pseudo'
                  rules={{
                    noSpace: true,
                    required: true
                  }}
                  stateComponent={this.getInputsValue.bind(this)}
                />
                <Input
                  type='password'
                  hintText='Password'
                  error='Veuillez saisir un mot de passe de 8 caractères minimum avec au moins un chiffre'
                  name='email'
                  rules={{
                    haveNumeric: true,
                    minLength: 8,
                    required: true
                  }}
                  fullWidth
                  stateComponent={this.getInputsValue.bind(this)}
                />
              </div>
            </CardText>
            <CardActions>
              <RaisedButton label="Primary" primary={true} disabled={!this.state.canSubmit} onClick={()=> {this.handleSubmit()}}/>
            </CardActions>            
        </Card>
      </div>
    )
  }
}

export default Signup
