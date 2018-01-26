import axios from 'axios'

import { logout } from '../authentification/utils'
import {historyPush} from '../config/history'
import config from '../config/config'
import * as constants from './constants'

export const fetchUser = () => dispatch => {
  dispatch({type: constants.FETCH_USER_REQUEST})
  return axios({
    method: 'get',
    url: `${config.API_BASE_URI}/users/me`
  })
  .then((user) => {
    return dispatch({type: constants.FETCH_USER_SUCCESS, payload: user.data})
  })
  .catch((error) => {
    return dispatch({type: constants.FETCH_USER_FAILURE, payload: error})
  })
}

export const logoutAction = () => {
  logout()
  historyPush('/login')
  return {
    type: constants.LOGOUT
  }
}
