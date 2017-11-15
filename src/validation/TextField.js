import React from 'react'
import Validation from './Validation'
import TextField from 'material-ui/TextField'

export default ({...props}) => {
  state = {
    errors: []
  }

  return (
    <TextField
      {...props}
      errorText={this.state.errors.length > 0 ? props.error : null}
      onChange={(event) => {
        this.setState({ error: Validation(event.target.value, props.validation) })
        console.log(this.state.error)
      }}
    />
  )
}
