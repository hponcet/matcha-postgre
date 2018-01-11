import axios from 'axios'

import * as constants from './constants'
import config from '../config/config'
import {historyPush} from '../config/history'

export const signup = (email, password, sex, firstName, lastName, pseudo, birthday) => dispatch => {
  dispatch({type: constants.SIGNUP_REQUEST})
  return axios({
    method: 'post',
    url: config.API_BASE_URI + '/signup',
    data: { email, password, sex, firstName, lastName, pseudo, birthday }
  })
  .then((json) => {
    window.localStorage.token = json.data.accessToken
    dispatch({type: constants.SIGNUP_SUCCESS, payload: json.data})
    return historyPush('/dashboard/home')
  })
  .catch((error) => dispatch({type: constants.SIGNUP_FAILURE, payload: error}))
}

export const login = (pseudo, password) => dispatch => {
  dispatch({type: constants.LOGIN_REQUEST})
  return axios({
    method: 'post',
    url: config.API_BASE_URI + '/login',
    data: { pseudo, password }
  })
  .then((json) => {
    window.localStorage.token = json.data.accessToken
    dispatch({type: constants.LOGIN_SUCCESS, payload: json.data})
    return historyPush('/dashboard/home')
  })
  .catch((error) => dispatch({type: constants.LOGIN_FAILURE, payload: error}))
}
