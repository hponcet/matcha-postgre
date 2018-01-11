import axios from 'axios'
import config from '../../config/config'
import * as constants from '../../profil/constants'

export const uploadPicture = (data) => dispatch => {
  dispatch({type: constants.FETCH_PROFIL_REQUEST})
  return axios({
    method: 'post',
    url: `${config.API_BASE_URI}/profils/pictures`,
    data
  })
  .then((profil) => dispatch({type: constants.FETCH_PROFIL_SUCCESS, payload: profil.data}))
  .catch((err) => dispatch({type: constants.FETCH_PROFIL_FAILURE, payload: err}))
}

export const deletePicture = (pictureUrl, index) => dispatch => {
  dispatch({type: constants.FETCH_PROFIL_REQUEST})
  return axios({
    method: 'delete',
    url: `${config.API_BASE_URI}/profils/pictures`,
    data: {picture: {url: pictureUrl, index}}
  })
  .then((profil) => dispatch({type: constants.FETCH_PROFIL_SUCCESS, payload: profil.data}))
  .catch((err) => dispatch({type: constants.FETCH_PROFIL_FAILURE, payload: err}))
}

export const updateProfilPicture = (pictureUrl) => dispatch => {
  dispatch({type: constants.FETCH_PROFIL_REQUEST})
  return axios({
    method: 'post',
    url: `${config.API_BASE_URI}/profils/me/pictures`,
    data: {pictureUrl}
  })
  .then((profil) => dispatch({type: constants.FETCH_PROFIL_SUCCESS, payload: profil.data}))
  .catch((err) => dispatch({type: constants.FETCH_PROFIL_FAILURE, payload: err}))
}
