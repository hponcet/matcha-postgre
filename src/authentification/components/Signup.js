import React from 'react'
import { Card, CardHeader, CardText, CardActions } from '../../styled-components/Cards'
import RaisedButton from 'material-ui/RaisedButton'
import { Input } from '../../styled-components/Inputs'

import './Signup.css'

class Signup extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      canSubmit: false,
      inputs: {},
      errors: []
    }
  }

  enableButton () { this.setState({canSubmit: true}) }
  disableButton () { this.setState({canSubmit: false}) }

  getInputsValue (props) {
    if (!props.name) return
    const inputs = this.state.inputs
    const errors = this.state.errors

    inputs[props.name] = props.value
    errors[props.name] = props.error
    this.setState({inputs, errors})
    console.log(errors)
    if (errors.forEach(error => (error === false))) this.setState({canSubmit: true})
    else this.setState({canSubmit: false})
  }

  handleSubmit () {
    const {inputs} = this.state
    this.props.signup(
      inputs['email'],
      inputs['password'],
      inputs['sex'],
      inputs['firstName'],
      inputs['lastName'],
      inputs['pseudo']
    )
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
            <RaisedButton label='Envoyer' disabled={!this.state.canSubmit} primary onClick={() => { this.handleSubmit() }} />
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default Signup
