import * as constants from './constants'
import axios from 'axios'
import config from '../config/config'

const url = `${config.API_BASE_URI}/profils/me`

export const fetchProfil = () => dispatch => {
  dispatch({ type: constants.FETCH_PROFIL_REQUEST })
  axios({
    method: 'get',
    url
  })
  .then((data) => {
    dispatch({type: constants.FETCH_PROFIL_SUCCESS, payload: data})
  })
  .catch((error) => {
    dispatch({type: constants.FETCH_PROFIL_FAILURE, payload: error})
  })
}

export const updateProfil = (profil) => dispatch => {
  dispatch({ type: constants.UPDATE_PROFIL_REQUEST })
  axios({
    method: 'post',
    url,
    data: profil
  })
  .then(() => {
    dispatch({type: constants.UPDATE_PROFIL_SUCCESS})
  })
  .catch((error) => {
    dispatch({type: constants.UPDATE_PROFIL_FAILURE, payload: error})
  })
}
