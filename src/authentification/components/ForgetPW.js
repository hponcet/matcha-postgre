import React from 'react'
import Crypto from 'crypto-js'

import Keys from '../../Keys'
import config from '../../config/config'
import { historyPush } from '../../config/history'
import { getToken } from '../utils'

import { Card, CardHeader, CardText, CardActions } from '../../styled-components/Cards'
import RaisedButton from 'material-ui/RaisedButton'
import { ClassicLinkButton } from '../../styled-components/Button'
import TextField from 'material-ui/TextField'

import './Signup.css'

class ForgetPW extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  componentWillMount () {
    if (getToken()) historyPush('/dashboard/home')
  }

  handleInputChange (value) {
    if (!this.state.value && value === ' ') return
    this.setState({value})
  }

  handleSubmit () {
    this.props.submitMail(this.state.value)
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
                  hintText='Veillez saisir votre E-mail...'
                  errorText={this.state.inputs.pseudo.showError && 'Veuillez saisir votre pseudo (sans espace)'}
                  name='pseudo'
                  value={this.state.value}
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
            <div className='Sign__link'><ClassicLinkButton onClick={() => { historyPush('/signup') }}>Créer un compte ?</ClassicLinkButton></div>
            <div className='Sign__link'><ClassicLinkButton onClick={() => { window.alert('Soon...') }}>Oublie du mot de passe ?</ClassicLinkButton></div>
          </div>
        </Card>
      </div>
    )
  }
}

export default ForgetPW
