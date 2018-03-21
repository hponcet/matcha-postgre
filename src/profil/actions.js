import * as constants from './constants'
import axios from 'axios'
import config from '../config/config'
import { GoogleMapsClient } from '../utils/googleMap'

export const fetchProfil = () => dispatch => {
  dispatch({ type: constants.FETCH_PROFIL_REQUEST })
  axios({
    method: 'get',
    url: `${config.API_BASE_URI}/profils/me`
  })
  .then((profil) => dispatch({type: constants.FETCH_PROFIL_SUCCESS, payload: profil.data}))
  .catch((error) => dispatch({type: constants.FETCH_PROFIL_FAILURE, payload: error}))
}

export const updateProfil = (profil) => dispatch => {
  dispatch({ type: constants.UPDATE_PROFIL_REQUEST })
  return axios({
    method: 'post',
    url: `${config.API_BASE_URI}/profils/me`,
    data: {profil}
  })
  .then(() => dispatch({type: constants.UPDATE_PROFIL_SUCCESS}))
  .catch((error) => dispatch({type: constants.UPDATE_PROFIL_FAILURE, payload: error}))
}

export const getProfil = (userId) => dispatch => {
  dispatch({ type: constants.GET_PROFIL_REQUEST })
  return axios({
    method: 'get',
    url: `${config.API_BASE_URI}/profils/${userId}`
  })
  .then((data) => dispatch({type: constants.GET_PROFIL_SUCCESS, payload: data}))
  .catch((error) => dispatch({type: constants.GET_PROFIL_FAILURE, payload: error}))
}

export const like = (profilId) => dispatch => {
  return axios({
    method: 'put',
    url: `${config.API_BASE_URI}/profils/like`,
    data: {profilId}
  })
}

export const profilView = (profilId) => dispatch => {
  return axios({
    method: 'put',
    url: `${config.API_BASE_URI}/profils/view`,
    data: {profilId}
  })
}

export const getGeocode = address => dispatch => {
  dispatch({ type: constants.GET_GEOCODE_REQUEST })
  return GoogleMapsClient.geocode({ address }, (err, response) => {
    if (err) return dispatch({ type: constants.GET_GEOCODE_FAILURE, payload: 'GOOGLE_API_ERROR' })
    return dispatch({ type: constants.GET_GEOCODE_SUCCESS, payload: response.json.results })
  })
}
