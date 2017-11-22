import React from 'react'
import { compact, map } from 'lodash'

import Validation from '../../validation/Validation'

import { Card, CardTitle, CardText, CardHeader } from 'material-ui/Card'
import Select from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Tags from '../../styled-components/tags/component/Tags'

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
          valid: (value) => Validation(value, {isInt: true})
        },
        orientation: {
          value: '',
          pristine: true,
          showError: false,
          valid: (value) => Validation(value, {isInt: true})
        },
        biography: {
          value: '',
          pristine: true,
          showError: false,
          valid: (value) => Validation(value, {isInt: true})
        },
        tags: {
          value: [],
          pristine: true,
          showError: false,
          valid: (value) => Validation(value, {isArray: true})
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

  handleSelectChange (event, index, value, name) {
    const inputs = this.state.inputs
    inputs[name].pristine = false
    inputs[name].value = value
    this.setState({ inputs })
    this.canSubmit()
  }

  handleSubmit (event) {
    this.props.updateProfil()
    event.preventDefault()
  }

  render () {
    return (
      <Card>
        <CardTitle>
          Éditer mon profil
        </CardTitle>

        <Card style={{margin: '20px'}}>
          <CardHeader>
            Mes attirances
          </CardHeader>
          <CardText>
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
          <CardHeader>
            Biographie
          </CardHeader>
          <CardText>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%'}}>
              <textarea
                type='text'
                style={{width: '80%', height: '50px'}}
                name='biography'
                value={this.state.inputs.biography.value}
                defaultValue={this.props.profil.biography}
                onChange={this.handleChange}
              />
            </div>
          </CardText>
        </Card>

        <Card style={{margin: '20px'}}>
          <CardHeader>
            Ma liste d'interrets
          </CardHeader>
          <CardText>
            <Tags handleChange={this.handleChange} componentName='tags' />
          </CardText>
        </Card>

      </Card>
    )
  }
}

export default Profil
