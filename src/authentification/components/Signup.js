import React from 'react'
import Formsy from 'formsy-react-es6'
import { Card, CardHeader, CardText } from '../../styled-components/Cards'
import { Input } from '../../styled-components/Inputs'
import Select from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
class Signup extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      canSubmit: false
    }
    this.enableButton = this.enableButton.bind(this)
    this.disableButton = this.disableButton.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  enableButton () { this.setState({canSubmit: true}) }
  disableButton () { this.setState({canSubmit: false}) }

  handleSubmit (values) {
    this.props.signup(
      values.email,
      values.password,
      values.type,
      values.firstName,
      values.lastName
    )
  }

  render () {
    return (
      <div>
        <Card style={{width: '500px'}}>
          <CardHeader>Créer mon profil</CardHeader>
          <Formsy.Form onValidSubmit={this.handleSubmit} onValid={this.enableButton} onInvalid={this.disableButton}>
            <CardText>
              {/* <Select
                name='type'
                fullWidth
                hintText='Sexe *'
                required
              >
                {
                  [
                    {label: 'Fille', value: '0'},
                    {label: 'Garçon', value: '1'}
                  ].map((type) => (
                    <MenuItem key={type.value} value={type.value} primaryText={type.label} />
                  ))
                }
              </Select> */}
              <Input
                type='text'
                hintText='Pseudo'
                error='Veuillez saisir un pseudo'
                name='pseudo'
                validation={{
                  isEmail: true
                }}
                width='100%'
                required
              />
              {/* <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <Input
                  name='firstName'
                  hintText='Prénom'
                  width='47%'
                />
                <Input
                  name='lastName'
                  hintText='Nom'
                  width='47%'
                />
              </div>
              <Input
                type='email'
                hintText='Email *'
                validationError={'Ceci n\'est pas un email'}
                name='email'
                validations='isEmail'
                width='100%'
                required
              />
              <Input
                name='password'
                validations='minLength:8'
                validationError={'Le mot de passe doit faire 8 charactères minimum'}
                hintText='Mot de passe *'
                type='password'
                width='100%'
                required
              /> */}
            </CardText>
            <button type='submit' disabled={!this.state.canSubmit}>Submit</button>
          </Formsy.Form>
        </Card>
      </div>
    )
  }
}

export default Signup
