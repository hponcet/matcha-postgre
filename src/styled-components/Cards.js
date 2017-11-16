import React from 'react'
import {
  Card as CardComponent,
  CardText as CardTextComponent,
  CardHeader as CardHeaderComponent,
  CardActions as CardActionsComponent
} from 'material-ui/Card'

const Card = ({children, style}) => {
  const componentStyle = (style) => {
    return {
      padding: '20px',
      ...style
    }
  }
  return (
    <CardComponent style={componentStyle(style)}>
      {children}
    </CardComponent>
  )
}

const CardHeader = ({children, style}) => {
  const componentStyle = (style) => {
    return {
      ...style
    }
  }
  return (
    <CardHeaderComponent style={componentStyle(style)}>
      {children}
    </CardHeaderComponent>
  )
}

const CardText = ({children, style}) => {
  const componentStyle = (style) => {
    return {
      ...style
    }
  }
  return (
    <CardTextComponent style={componentStyle(style)}>
      {children}
    </CardTextComponent>
  )
}

const CardActions = ({children, style}) => {
  const componentStyle = (style) => {
    return {
      ...style
    }
  }
  return (
    <CardActionsComponent style={componentStyle(style)}>
      {children}
    </CardActionsComponent>
  )
}


export {
  Card,
  CardHeader,
  CardText,
  CardActions
}
