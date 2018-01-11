import * as constants from './constants'
import axios from 'axios'
import config from '../config/config'

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

export const getProfils = () => dispatch => {
  dispatch({ type: constants.GET_PROFILS_REQUEST })
  axios({
    method: 'get',
    url: `${config.API_BASE_URI}/profils`
  })
  .then((profils) => dispatch({type: constants.GET_PROFILS_SUCCESS, payload: profils.data}))
  .catch((error) => dispatch({type: constants.GET_PROFILS_FAILURE, payload: error}))
}

export const searchProfils = (search) => dispatch => {
  dispatch({ type: constants.GET_PROFILS_REQUEST })
  return axios({
    method: 'post',
    url: `${config.API_BASE_URI}/profils`,
    data: search
  })
  .then((profils) => dispatch({type: constants.GET_PROFILS_SUCCESS, payload: profils.data}))
  .catch((error) => dispatch({type: constants.GET_PROFILS_FAILURE, payload: error}))
}

export const like = (profilId) => dispatch => {
  dispatch({ type: constants.LIKE_PROFIL_REQUEST })
  return axios({
    method: 'put',
    url: `${config.API_BASE_URI}/profils/like`,
    data: {profilId}
  })
  .then((data) => dispatch({type: constants.LIKE_PROFIL_SUCCESS, payload: data}))
  .catch((error) => dispatch({type: constants.LIKE_PROFIL_FAILURE, payload: error}))
}

export const getLikes = () => dispatch => {
  dispatch({ type: constants.LIKE_PROFIL_REQUEST })
  return axios({
    method: 'get',
    url: `${config.API_BASE_URI}/profils/me/likes`
  })
  .then((data) => dispatch({type: constants.LIKE_PROFIL_SUCCESS, payload: data}))
  .catch((error) => dispatch({type: constants.LIKE_PROFIL_FAILURE, payload: error}))
}

export const profilView = (profilId) => dispatch => {
  return axios({
    method: 'put',
    url: `${config.API_BASE_URI}/profils/view`,
    data: {profilId}
  })
}
