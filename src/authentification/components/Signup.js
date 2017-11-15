import React from 'react'
import { Card, CardHeader, CardText } from '../../styled-components/Cards'
import { Input } from '../../styled-components/Inputs'
import Select from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
class Signup extends React.Component {
  state = {
    canSubmit: false,
    inputs: {}
  }
  enableButton () { this.setState({canSubmit: true}) }
  disableButton () { this.setState({canSubmit: false}) }

  getInputValue (props) {
    if (!props.name) return
    const inputs = this.state.inputs

    inputs[props.name] = {value: props.value, errors: props.errors}
    this.setState({inputs})
    console.log(this.state.inputs)
  }

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
            <CardText>
              <Input
                type='email'
                hintText='Email'
                error='Veuillez saisir un E-mail'
                name='email'
                rules={{
                  isEmail: true,
                  required: true
                }}
                stateComponent={this.getInputValue.bind(this)}
                required
              />
            </CardText>
            <button type='submit' disabled={!this.state.canSubmit}>Submit</button>
        </Card>
      </div>
    )
  }
}

export default Signup
