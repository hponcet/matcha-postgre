import React from 'react'
import { compact, map } from 'lodash'
import Crypto from 'crypto-js'

import Validation from '../../validation/Validation'
import Keys from '../../Keys'
import config from '../../config/config'
import history from '../../config/history'
import { getToken } from '../utils'

import { Card, CardHeader, CardText, CardActions } from '../../styled-components/Cards'
import RaisedButton from 'material-ui/RaisedButton'
import { ClassicLinkButton } from '../../styled-components/Button'
import TextField from 'material-ui/TextField'

import './Signup.css'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      canSubmit: false,
      inputs: {
        pseudo: {
          value: '',
          pristine: true,
          showError: false,
          valid: (value) => Validation(value, {isRequired: true, noSpace: true})
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
    this.handleSubmit = this.handleSubmit.bind(this)
    this.showError = this.showError.bind(this)
  }

  componentWillMount () {
    if (getToken()) history.push('/home')
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

  handleSubmit (event) {
    const { pseudo, password } = this.state.inputs
    this.props.login(
      pseudo.value,
      Crypto.SHA512(password.value, config.SECRET_HASH).toString()
    )
    event.preventDefault()
  }

  render () {
    return (
      <div>
        <Card style={{width: '500px'}}>
          <CardHeader>Connection</CardHeader>
          <form onSubmit={this.handleSubmit} method='post'>
            <CardText>
              <div className='Sign__inputsColumnContainer'>
                <TextField
                  type='text'
                  hintText='Pseudo *'
                  errorText={this.state.inputs.pseudo.showError && 'Veuillez saisir votre pseudo (sans espace)'}
                  name='pseudo'
                  value={this.state.inputs.pseudo.value}
                  onChange={this.handleChange}
                  onBlur={this.showError}
                  fullWidth
                  required
                />
                <TextField
                  type='password'
                  hintText='Mot de passe *'
                  errorText={this.state.inputs.password.showError && 'Votre mot de passe possède 8 caractères minimum et au moins un chiffre'}
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
              <RaisedButton label='Se connécter' disabled={!this.state.canSubmit} primary type='submit' />
            </CardActions>
          </form>
          <CardText>
            <div className='Sign__errorContainer'>
              {Keys(this.props.error ? this.props.error.appCode : null)}
            </div>
          </CardText>
          <div className='Sign__linkContainer'>
            <div className='Sign__link'><ClassicLinkButton onClick={() => { history.push('/signup') }}>Créer un compte ?</ClassicLinkButton></div>
            <div className='Sign__link'><ClassicLinkButton onClick={() => { window.alert('Soon...') }}>Oublie du mot de passe ?</ClassicLinkButton></div>
          </div>
        </Card>
      </div>
    )
  }
}

export default Login
