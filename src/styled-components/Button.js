import React from 'react'

import { Link } from 'react-router-dom'

import './Button.css'

export const CustomButton = ({props, children}) => {
  return (
    <button
      {...props}
      className='Button__noHighlight'
    >
      {children}
    </button>
  )
}

export const ClassicLinkButton = ({props, children, style, onClick}) => {
  return (
    <button
      className='Button__noHighlight'
      style={{
        backgroundColor: 'none',
        border: '0 none',
        color: '#0098CA',
        fontSize: '14px',
        padding: '0px',
        margin: '0px',
        cursor: 'pointer',
        ...style
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export const LinkButton = ({props, children, style}) => {
  return (
    <Link
      {...props}
      className='Button__noHighlight'
      style={{
        backgroundColor: 'none',
        border: '0 none',
        color: '#0098CA',
        fontSize: '14px',
        padding: '0px',
        margin: '0px',
        cursor: 'pointer',
        ...style
      }}
    >
      {children}
    </Link>
  )
}
