import React from 'react'
import history from '../config/history'

import { getToken } from './utils'

export const isAuthenticated = (WrappedComponent) => {
  return class extends React.Component {
    componentDidMount () {
      const isAuthenticated = (getToken() !== null && getToken() !== undefined)
      if (!isAuthenticated) {
        history.push('/login')
      }
    }
    render () {
      return <WrappedComponent {...this.props} />
    }
  }
}
