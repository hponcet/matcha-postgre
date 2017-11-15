import React from 'react'
import Validation from './Validation'
import TextField from 'material-ui/TextField'

class Input extends React.Component {
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
        errorText={displayError ? error : null}
        onChange={(e) => stateComponent({
          errors: Validation(e.target.value, rules) || null,
          value: e.target.value,
          name: this.props.name || null
        })}
      />
    )
  }
}

export default Input
