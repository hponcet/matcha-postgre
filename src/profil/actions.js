import * as constants from './constants'
import axios from 'axios'
import config from '../config/config'

export const updateProfil = (profil) => dispatch => {
  dispatch({ type: constants.PROFIL_REQUEST })
  axios({
    method: 'post',
    url: `${config.API_BASE_URI}/profils/me`,
    data: profil
  })
  .then((data) => {
    dispatch({type: constants.PROFIL_SUCCESS, payload: data})
  })
  .catch((error) => {
    dispatch({type: constants.PROFIL_FAILURE, payload: error})
  })
}
