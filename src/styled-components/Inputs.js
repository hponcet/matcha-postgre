import React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'

import MuiTextField from '../validation/TextField'

const Input = muiThemeable()(({ muiTheme, ...props }) => (
  <MuiTextField
    {...props}
    inputStyle={{
      color: '#33455b'
    }}
    errorStyle={{
      color: '#f67258'
    }}
    style={{
      width: props.width
    }}
  />
))

export {
  Input
}
