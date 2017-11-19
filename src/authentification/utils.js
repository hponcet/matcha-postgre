import axios from 'axios'
import startsWith from 'lodash/startsWith'
import history from '../config/history'

import appConfig from '../config/config'

export const getToken = () => {
  return window.localStorage.token
}

export const setToken = (token) => {
  window.localStorage.token = token
}

export const initInterceptor = () => {
  axios.interceptors.request.use((config) => {
    const token = getToken()
    if (startsWith(config.url, appConfig.API_BASE_URI) && token) {
      config.headers['authorization'] = 'Bearer ' + token
    }
    return config
  })

  axios.interceptors.response.use(null, (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.code === 'INVALID_TOKEN'
    ) {
      logout()
      history.push('/login')
    }

    return Promise.reject(error)
  })
}

export const logout = () => {
  delete window.localStorage.token
}
