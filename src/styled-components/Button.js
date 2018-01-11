import React from 'react'

import { Link } from 'react-router-dom'

import './Button.css'

export const CustomButton = ({props, style, children, onClick}) => {
  return (
    <button
      className='Button__noHighlight'
      onClick={onClick}
      style={style}
      {...props}
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

export const LinkButton = ({to, props, className, children, style}) => {
  return (
    <Link
      {...props}
      to={to}
      className={className}
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
