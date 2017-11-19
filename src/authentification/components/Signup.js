import React from 'react'
import { compact, map } from 'lodash'

import Validation from '../../validation/Validation'
import Keys from '../../Keys'

import { Card, CardHeader, CardText, CardActions } from '../../styled-components/Cards'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Select from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import './Signup.css'

class Signup extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      canSubmit: false,
      inputs: {
        sex: {
          value: '',
          pristine: true,
          showError: false,
          valid: (value) => Validation(value, {isRequired: true, isInt: true})
        },
        firstName: {
          value: '',
          pristine: true,
          showError: false,
          valid: (value) => Validation(value, {})
        },
        lastName: {
          value: '',
          pristine: true,
          showError: false,
          valid: (value) => Validation(value, {})
        },
        pseudo: {
          value: '',
          pristine: true,
          showError: false,
          valid: (value) => Validation(value, {isRequired: true, noSpace: true})
        },
        email: {
          value: '',
          pristine: true,
          showError: false,
          valid: (value) => Validation(value, {isRequired: true, isEmail: true})
        },
        password: {
          value: '',
          pristine: true,
          showError: false,
          valid: (value) => Validation(value, {isRequired: true, haveNumeric: true, minLength: 8})
        }
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.showError = this.showError.bind(this)
  }

  enableButton () { this.setState({canSubmit: true}) }
  disableButton () { this.setState({canSubmit: false}) }

  canSubmit () {
    const inputsValidity = map(this.state.inputs, (input) => input.valid(input.value))
    const isValid = compact(inputsValidity)
    if (isValid.length === inputsValidity.length) this.setState({ canSubmit: true })
    else this.setState({ canSubmit: false })
  }

  showError (event) {
    const { name, value } = event.target
    const inputs = this.state.inputs
    inputs[name].pristine = false
    if (!inputs[name].valid(value)) inputs[name].showError = true
    else inputs[name].showError = false
    this.setState({ inputs })
  }

  handleChange (event) {
    let { type, checked, value, name } = event.target
    const targetValue = type === 'checkbox' ? checked : value
    const inputs = this.state.inputs
    inputs[name].value = targetValue
    if (!inputs[name].valid(value) && !inputs[name].pristine) inputs[name].showError = true
    this.setState({ inputs })
    this.canSubmit()
  }

  handleSelectChange (event, index, value) {
    const inputs = this.state.inputs
    inputs['sex'].value = value
    this.setState({ inputs })
    this.canSubmit()
  }

  handleSubmit (event) {
    const { email, password, sex, firstName, lastName, pseudo } = this.state.inputs
    this.props.signup(
      email.value,
      password.value,
      sex.value,
      firstName.value,
      lastName.value,
      pseudo.value
    )
    event.preventDefault()
  }

  render () {
    return (
      <div>
        <Card style={{width: '500px'}}>
          <CardHeader>Créer mon compte</CardHeader>
          <form onSubmit={this.handleSubmit} method='post'>
            <CardText>
              <div className='Signup__inputsColumnContainer'>
                <Select
                  floatingLabelText='Sexe *'
                  value={this.state.inputs.sex.value}
                  errorText={this.state.inputs.sex.showError && 'Veuillez selecionner votre sexe'}
                  onChange={this.handleSelectChange}
                  id='sex'
                  fullWidth
                >
                  <MenuItem value={'1'} primaryText='Homme' />
                  <MenuItem value={'2'} primaryText='Femme' />
                </Select>
                <div className='Signup__inputsRowContainer'>
                  <TextField
                    type='text'
                    hintText='Prénom'
                    name='firstName'
                    value={this.state.inputs.firstName.value}
                    onChange={this.handleChange}
                    onBlur={this.showError}
                    style={{width: '47%'}}
                  />
                  <TextField
                    type='text'
                    hintText='Nom'
                    name='lastName'
                    value={this.state.inputs.lastName.value}
                    onChange={this.handleChange}
                    onBlur={this.showError}
                    style={{width: '47%'}}
                  />
                </div>
                <TextField
                  type='text'
                  hintText='Pseudo *'
                  errorText={this.state.inputs.pseudo.showError && 'Veuillez saisir un pseudo sans espace'}
                  name='pseudo'
                  value={this.state.inputs.pseudo.value}
                  onChange={this.handleChange}
                  onBlur={this.showError}
                  fullWidth
                  required
                />
                <TextField
                  type='email'
                  hintText='Email *'
                  errorText={this.state.inputs.email.showError && 'Veuillez saisir un e-mail'}
                  name='email'
                  value={this.state.inputs.email.value}
                  onChange={this.handleChange}
                  onBlur={this.showError}
                  fullWidth
                  required
                />
                <TextField
                  type='password'
                  hintText='Password'
                  errorText={this.state.inputs.password.showError && 'Veuillez saisir un mot de passe de 8 caractères minimum avec au moins un chiffre'}
                  name='password'
                  value={this.state.inputs.password.value}
                  onChange={this.handleChange}
                  onBlur={this.showError}
                  fullWidth
                  required
                />
              </div>
            </CardText>
            <CardActions>
              <RaisedButton label='Envoyer' disabled={!this.state.canSubmit} primary type='submit' />
            </CardActions>
          </form>
          <CardText>
            <div className='Signup__errorContainer'>
              { Keys(this.props.error && this.props.error.response ? this.props.error.response.data : null) }
            </div>
          </CardText>
        </Card>
      </div>
    )
  }
}

export default Signup
