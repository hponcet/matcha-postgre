import React from 'react'
import {historyPush} from '../config/history'

import { getToken } from './utils'

export const isAuthenticated = (WrappedComponent) => {
  return class extends React.Component {
    componentWillMount () {
      const isAuthenticated = (getToken() !== null && getToken() !== undefined)
      if (!isAuthenticated) {
        historyPush('/login')
      }
    }
    render () {
      return <WrappedComponent {...this.props} />
    }
  }
}
