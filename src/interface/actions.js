import { logout } from '../authentification/utils'
import history from '../config/history'
import * as constants from './constants'

export const logoutAction = () => {
  logout()
  history.push('/')
  return {
    type: constants.LOGOUT
  }
}
