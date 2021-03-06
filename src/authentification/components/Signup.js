import React from 'react'
import { compact, map } from 'lodash'
import Crypto from 'crypto-js'

import Validation from '../../validation/Validation'
import Keys from '../../Keys'
import config from '../../config/config'
import { historyPush } from '../../config/history'
import { getToken, dateTimeFormat } from '../utils'

import { Card, CardHeader, CardText, CardActions } from '../../styled-components/Cards'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { ClassicLinkButton } from '../../styled-components/Button'
import Select from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'

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
        },
        birthday: {
          value: null,
          pristine: true,
          showError: false,
          valid: (value) => Validation(value, {isRequired: true})
        }
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.showError = this.showError.bind(this)
  }

  enableButton () { this.setState({canSubmit: true}) }
  disableButton () { this.setState({canSubmit: false}) }

  componentWillMount () {
    if (getToken()) historyPush('/dashboard/home')
  }

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
    else if (inputs[name].valid(value) && !inputs[name].pristine) inputs[name].showError = false
    this.setState({ inputs })
    this.canSubmit()
  }

  handleDateChange (event, date) {
    const inputs = this.state.inputs
    inputs['birthday'].value = date
    this.setState({inputs})
    this.canSubmit()
  }

  handleSelectChange (event, index, value) {
    const inputs = this.state.inputs
    inputs['sex'].value = value
    this.setState({ inputs })
    this.canSubmit()
  }

  handleSubmit (event) {
    event.preventDefault()
    const { email, password, sex, firstName, lastName, pseudo, birthday } = this.state.inputs
    this.props.signup(
      email.value,
      Crypto.SHA512(password.value, config.SECRET_HASH).toString(),
      sex.value,
      firstName.value,
      lastName.value,
      pseudo.value,
      birthday.value
    )
  }

  render () {
    return (
      <div>
        <Card style={{width: '500px'}}>
          <CardHeader>Créer mon compte</CardHeader>
          <form onSubmit={this.handleSubmit} method='post'>
            <CardText>
              <div className='Sign__inputsColumnContainer'>
                <Select
                  floatingLabelText='Sexe *'
                  value={this.state.inputs.sex.value}
                  errorText={this.state.inputs.sex.showError && 'Veuillez selecionner votre sexe'}
                  onChange={this.handleSelectChange}
                  fullWidth
                >
                  <MenuItem value={'1'} primaryText='Homme' />
                  <MenuItem value={'2'} primaryText='Femme' />
                </Select>
                <div className='Sign__inputsRowContainer'>
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
                <DatePicker
                  hintText='Date de naissance *'
                  value={this.state.inputs.birthday.value}
                  onChange={this.handleDateChange}
                  DateTimeFormat={dateTimeFormat()}
                  openToYearSelection
                  locale='fr'
                  fullWidth
                  required
                />
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
                  hintText='E-mail *'
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
                  hintText='Mot de passe'
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
            <div className='Sign__errorContainer'>
              { Keys(this.props.error ? this.props.error.appCode : null) }
            </div>
          </CardText>
          <div className='Sign__linkContainer'>
            <div className='Sign__link'><ClassicLinkButton onClick={() => { historyPush('/login') }}>Se connécter ?</ClassicLinkButton></div>
            <div className='Sign__link'><ClassicLinkButton onClick={() => { window.alert('Soon...') }}>Oublie du mot de passe ?</ClassicLinkButton></div>
          </div>
        </Card>
      </div>
    )
  }
}

export default Signup
