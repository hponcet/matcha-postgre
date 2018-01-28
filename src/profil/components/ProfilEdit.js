import React from 'react'
import { compact, map, forEach } from 'lodash'

import Validation from '../../validation/Validation'
import Keys from '../../Keys'

import { Card, CardText, CardHeader, CardActions } from 'material-ui/Card'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Select from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import Tags from '../../styled-components/tags/component/Tags'
import PicturesUpload from '../../styled-components/pictures/containers/PicturesUpload'

import './Profil.css'

class Profil extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      canSubmit: false,
      openInfosPictures: false,
      picturesExpanded: true,
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
        firstname: {
          value: '',
          pristine: true,
          showError: false,
          valid: (value) => Validation(value, {})
        },
        lastname: {
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
    this.clearFields = this.clearFields.bind(this)
    this.infosAddingPicture = this.infosAddingPicture.bind(this)
    this.handleInfosClose = this.handleInfosClose.bind(this)
  }

  componentDidMount () {
    this.props.fetchUser()
    if (this.props.pictures.length === 0) {
      this.infosAddingPicture()
    }
  }

  enableButton () { this.setState({canSubmit: true}) }
  disableButton () { this.setState({canSubmit: false}) }

  handleInfosClose () { this.setState({openInfosPictures: false}) }

  infosAddingPicture () {
    const UrlParams = new URLSearchParams(this.props.location.search)
    if (UrlParams.get('emptypics') === '1') { this.setState({openInfosPictures: true}) }
  }

  clearFields () {
    const inputs = this.state.inputs
    forEach(inputs, (input, key) => {
      input.pristine = true
      input.value = ''
      input.showError = false
    })
    this.setState({inputs, canSubmit: false})
  }

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
    return this.props.updateProfil(updatedData)
    .then(() => {
      this.clearFields()
      this.props.fetchUser()
      this.props.fetchProfil()
    })
  }

  render () {
    return (
      <Card style={{minWidth: '400px', width: '70%', alignSelf: 'center'}}>
        <div className='Profil__profilPicture__container'>
          <div className='Profil__profilPicture__border'>
            <img style={{width: '200px', borderRadius: '50%'}} src={this.props.profilPicture} alt='' />
          </div>
        </div>
        <Card style={{margin: '20px'}}>
          <CardHeader
            style={{backgroundColor: '#79A5C5', color: '#ffffff'}}
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
            style={{backgroundColor: '#79A5C5', color: '#ffffff'}}
            actAsExpander
            showExpandableButton
          >
            Biographie
          </CardHeader>
          <CardText expandable>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%'}}>
              <textarea
                type='text'
                style={{width: '98%', height: '70px'}}
                name='biography'
                value={this.state.inputs.biography.pristine ? this.props.profil.biography : this.state.inputs.biography.value}
                onChange={this.handleChange}
              />
            </div>
          </CardText>
        </Card>

        <Card style={{margin: '20px'}}>
          <CardHeader
            style={{backgroundColor: '#79A5C5', color: '#ffffff'}}
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
            style={{backgroundColor: '#79A5C5', color: '#ffffff'}}
            actAsExpander
            showExpandableButton
          >
            Mes photos
          </CardHeader>
          <CardText expandable={this.state.picturesExpanded}>
            <PicturesUpload />
          </CardText>
        </Card>

        <Card style={{margin: '20px'}}>
          <CardHeader
            style={{backgroundColor: '#79A5C5', color: '#ffffff'}}
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
                name='firstname'
                value={this.state.inputs.firstname.pristine ? this.props.user.firstname : this.state.inputs.firstname.value}
                onChange={this.handleChange}
                style={{width: '47%'}}
              />
              <TextField
                type='text'
                hintText='Nom'
                name='lastname'
                value={this.state.inputs.lastname.pristine ? this.props.user.lastname : this.state.inputs.lastname.value}
                onChange={this.handleChange}
                style={{width: '47%'}}
              />
            </div>
            <TextField
              type='email'
              hintText='E-mail'
              errorText={this.state.inputs.email.showError ? 'Votre email doit avoir un format valide.' : null}
              name='email'
              value={this.state.inputs.email.pristine ? this.props.user.email : this.state.inputs.email.value}
              onChange={this.handleChange}
              fullWidth
            />
          </CardText>
        </Card>

        <CardActions style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
          <RaisedButton backgroundColor='#79A5C5' labelColor='#ffffff' label='Valider' disabled={!this.state.canSubmit || this.props.isUpdating} onClick={this.handleSubmit} style={{margin: '20px'}} />
        </CardActions>

        <CardText>
          <div className='Sign__errorContainer'>
            {Keys(this.props.profilError ? this.props.profilError.appCode : null)}
          </div>
        </CardText>

        <Dialog
          title='Veuillez choisir une photo de profil'
          actions={<FlatButton
            label='Ok'
            primary
            keyboardFocused
            onClick={() => {
              this.setState({picturesExpanded: false})
              this.handleInfosClose()
            }}
          />}
          modal={false}
          open={this.state.openInfosPictures}
          onRequestClose={this.handleInfosClose}
        >
          Vous devez choisir au minimum une photo de profil pour rencontrer d'autres personnes.<br />
          Vous pourrez le faire à partir de la partie Mes photos située sur cette page.
        </Dialog>

      </Card>
    )
  }
}

export default Profil
