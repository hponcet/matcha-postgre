import React from 'react'
import { compact, map } from 'lodash'

import Validation from '../../validation/Validation'

import { Card, CardText, CardHeader, CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Select from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import Tags from '../../styled-components/tags/component/Tags'
import Pictures from '../../styled-components/pictures/containers/Pictures'

import './Profil.css'

class Profil extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      canSubmit: false,
      inputs: {
        sex: {
          value: '',
          pristine: true,
          showError: false,
          valid: (value) => Validation(value, {})
        },
        orientation: {
          value: '',
          pristine: true,
          showError: false,
          valid: (value) => Validation(value, {})
        },
        biography: {
          value: '',
          pristine: true,
          showError: false,
          valid: (value) => Validation(value, {})
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
        email: {
          value: '',
          pristine: true,
          showError: false,
          valid: (value) => Validation(value, {isEmail: true})
        }
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  enableButton () { this.setState({canSubmit: true}) }
  disableButton () { this.setState({canSubmit: false}) }

  canSubmit () {
    const inputsValidity = map(this.state.inputs, (input) => input.valid(input.value))
    const isValid = compact(inputsValidity)
    if (isValid.length === inputsValidity.length) this.setState({ canSubmit: true })
    else this.setState({ canSubmit: false })
  }

  handleChange (event) {
    let { type, checked, value, name } = event.target
    const targetValue = type === 'checkbox' ? checked : value
    const inputs = this.state.inputs
    inputs[name].value = targetValue || ''
    inputs[name].pristine = false
    if (!inputs[name].valid(value) && !inputs[name].pristine) inputs[name].showError = true
    else inputs[name].showError = false
    this.setState({ inputs })
    this.canSubmit()
  }

  handleSelectChange (event, index, value, name) {
    const inputs = this.state.inputs
    inputs[name].pristine = false
    inputs[name].value = value
    this.setState({ inputs })
    this.canSubmit()
  }

  handleSubmit (event) {
    event.preventDefault()
    const updatedData = map(this.state.inputs, (input, key) => {
      if (!input.pristine) return {type: key, value: input.value, pristine: input.pristine}
      return {type: key, pristine: true}
    })
    if (updatedData.length < 1) return this.setState({canSubmit: false})
    console.log(updatedData)
    this.props.updateProfil()
  }

  render () {
    return (
      <Card style={{width: '70%', alignSelf: 'center'}}>
        <div className='Profil__profilPicture__container'>
          <div className='Profil__profilPicture__border'>
            <img style={{width: '200px', borderRadius: '50%'}} src={this.props.profilPicture} alt='' />
          </div>
        </div>
        <Card style={{margin: '20px'}}>
          <CardHeader
            style={{backgroundColor: 'lightgrey'}}
            actAsExpander
            showExpandableButton
          >
            Mes attirances
          </CardHeader>
          <CardText expandable>
            <div style={{display: 'flex', flexDirection: 'row', fontSize: '16px'}}>
              <div style={{height: '50px', display: 'flex', alignItems: 'center', marginRight: '5px'}}>Je suis</div>
              <div style={{height: '50px', display: 'flex', alignItems: 'center'}}>
                <Select
                  ref='sex'
                  value={this.state.inputs.sex.pristine ? this.props.profil.sex : this.state.inputs.sex.value}
                  errorText={this.state.inputs.sex.showError && 'Veuillez selecionner votre sexe'}
                  onChange={(e, i, v) => this.handleSelectChange(e, i, v, 'sex')}
                  style={{width: '140px'}}
                >
                  <MenuItem value={'1'} primaryText='un homme' />
                  <MenuItem value={'2'} primaryText='une femme' />
                </Select>
              </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', fontSize: '16px'}}>
              <div style={{height: '50px', display: 'flex', alignItems: 'center', marginRight: '5px'}}>Je suis interréssé par les</div>
              <div style={{height: '50px', display: 'flex', alignItems: 'center'}}>
                <Select
                  ref='orientation'
                  value={this.state.inputs.orientation.pristine ? this.props.profil.orientation : this.state.inputs.orientation.value}
                  errorText={this.state.inputs.sex.showError && 'Veuillez selecionner votre sexe'}
                  onChange={(e, i, v) => this.handleSelectChange(e, i, v, 'orientation')}
                  style={{width: '140px'}}
                >
                  <MenuItem value={'1'} primaryText='hommes' />
                  <MenuItem value={'2'} primaryText='femmes' />
                  <MenuItem value={'3'} primaryText='deux' />
                </Select>
              </div>
            </div>
          </CardText>
        </Card>

        <Card style={{margin: '20px'}}>
          <CardHeader
            style={{backgroundColor: 'lightgrey'}}
            actAsExpander
            showExpandableButton
          >
            Biographie
          </CardHeader>
          <CardText expandable>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%'}}>
              <textarea
                type='text'
                style={{width: '80%', height: '50px'}}
                name='biography'
                value={this.state.inputs.biography.pristine ? this.props.profil.biography : this.state.inputs.biography.value}
                defaultValue={this.props.profil.biography}
                onChange={this.handleChange}
              />
            </div>
          </CardText>
        </Card>

        <Card style={{margin: '20px'}}>
          <CardHeader
            style={{backgroundColor: 'lightgrey'}}
            actAsExpander
            showExpandableButton
          >
            Ma liste d'interrets
          </CardHeader>
          <CardText expandable>
            <Tags componentName='tags' />
          </CardText>
        </Card>

        <Card style={{margin: '20px'}}>
          <CardHeader
            style={{backgroundColor: 'lightgrey'}}
            actAsExpander
            showExpandableButton
          >
            Mes photos
          </CardHeader>
          <CardText expandable>
            <Pictures />
          </CardText>
        </Card>
        
        <Card style={{margin: '20px'}}>
          <CardHeader
            style={{backgroundColor: 'lightgrey'}}
            actAsExpander
            showExpandableButton
          >
            Mon Compte
          </CardHeader>
          <CardText expandable>
            <div className='Sign__inputsRowContainer'>
              <TextField
                type='text'
                hintText='Prénom'
                name='firstName'
                value={this.state.inputs.firstName.pristine ? this.props.firstName : this.state.inputs.firstName.value}
                onChange={this.handleChange}
                style={{width: '47%'}}
              />
              <TextField
                type='text'
                hintText='Nom'
                name='lastName'
                value={this.state.inputs.lastName.pristine ? this.props.lastName : this.state.inputs.lastName.value}
                onChange={this.handleChange}
                style={{width: '47%'}}
              />
            </div>
            <TextField
              type='email'
              hintText='E-mail'
              errorText={this.state.inputs.email.showError ? 'Votre email doit avoir un format valide.' : null}
              name='email'
              value={this.state.inputs.email.pristine ? this.props.email : this.state.inputs.email.value}
              onChange={this.handleChange}
              fullWidth
            />
          </CardText>
        </Card>

        <CardActions style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
          <RaisedButton label='Valider' disabled={!this.state.canSubmit} primary onClick={this.handleSubmit} style={{margin: '20px'}} />
        </CardActions>

      </Card>
    )
  }
}

export default Profil
