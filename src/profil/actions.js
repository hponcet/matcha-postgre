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
  .then((profil) => {
    dispatch({type: constants.FETCH_PROFIL_SUCCESS, payload: profil.data})
  })
  .catch((error) => {
    dispatch({type: constants.FETCH_PROFIL_FAILURE, payload: error})
  })
}

export const updateProfil = (profil) => dispatch => {
  dispatch({ type: constants.UPDATE_PROFIL_REQUEST })
  return axios({
    method: 'post',
    url,
    data: {profil}
  })
  .then(() => {
    dispatch({type: constants.UPDATE_PROFIL_SUCCESS})
    return null
  })
  .catch((error) => {
    dispatch({type: constants.UPDATE_PROFIL_FAILURE, payload: error})
    return null
  })
}

export const getProfil = (userId) => dispatch => {
  dispatch({ type: constants.GET_PROFIL_REQUEST })
  return axios({
    method: 'get',
    url: `${config.API_BASE_URI}/profils/${userId}`
  })
  .then((data) => {
    dispatch({type: constants.GET_PROFIL_SUCCESS, payload: data})
    return null
  })
  .catch((error) => {
    dispatch({type: constants.GET_PROFIL_FAILURE, payload: error})
    return null
  })
}
