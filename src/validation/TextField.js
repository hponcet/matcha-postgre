import React from 'react'
import Validation from './Validation'
import TextField from 'material-ui/TextField'

class Input extends React.Component {
  state = {
    displayError: false,
    value: '',
    errors: []
  }
  render () {
    const {
      rules,
      stateComponent,
      displayError,
      error,
      ...inputProps
    } = this.props

    return (
      <TextField
        {...inputProps}
        errorText={this.state.displayError && this.state.value && this.state.errors.length > 0 ? error : null}
        onChange={(e) => {
          this.setState({ errors: Validation(e.target.value, rules), value: e.target.value })
          stateComponent({ value: e.target.value, name: this.props.name || null })
        }}
        onBlur={() => this.setState({displayError: true})}
      />
    )
  }
}

export default Input
