import axios from 'axios'

import * as constants from './constants'
import config from '../config/config'
import history from '../config/history'

export const signup = (email, password, sex, firstName, lastName, pseudo) => dispatch => {
  dispatch({
    type: constants.SIGNUP_REQUEST
  })
  axios({
    method: 'post',
    url: config.API_BASE_URI + '/signup',
    data: { email, password, sex, firstName, lastName, pseudo }
  })
  .then((json) => {
    window.localStorage.token = json.data.accessToken
    dispatch({
      type: constants.SIGNUP_SUCCESS,
      payload: json.data
    })
    return history.push('/home')
  })
  .catch((error) => {
    dispatch({
      type: constants.SIGNUP_FAILURE,
      payload: error.appCode
    })
  })
}
