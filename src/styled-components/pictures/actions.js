import axios from 'axios'
import config from '../../config/config'
import * as constants from './constants'

const picturesUrl = `${config.API_BASE_URI}/pictures`
const profilPictureUrl = `${picturesUrl}/profil`

export const fetchPictures = () => dispatch => {
  dispatch({type: constants.FETCH_PICTURES_REQUEST})
  return axios({
    method: 'get',
    url: picturesUrl
  })
  .then((data) => dispatch({type: constants.FETCH_PICTURES_SUCCESS, payload: data}))
  .catch((err) => dispatch({type: constants.FETCH_PICTURES_FAILURE, payload: err}))
}

export const uploadPicture = (data) => dispatch => {
  dispatch({type: constants.UPLOAD_PICTURE_REQUEST})
  return axios({
    method: 'post',
    url: picturesUrl,
    data
  })
  .then((data) => dispatch({type: constants.UPLOAD_PICTURE_SUCCESS, payload: data}))
  .catch((err) => dispatch({type: constants.UPLOAD_PICTURE_FAILURE, payload: err}))
}

export const deletePicture = (pictureUrl, index) => dispatch => {
  dispatch({type: constants.UPLOAD_PICTURE_REQUEST})
  return axios({
    method: 'delete',
    url: picturesUrl,
    data: {picture: {url: pictureUrl, index}}
  })
  .then((data) => dispatch({type: constants.UPLOAD_PICTURE_SUCCESS, payload: data}))
  .catch((err) => dispatch({type: constants.UPLOAD_PICTURE_FAILURE, payload: err}))
}

export const updateProfilPicture = (pictureUrl) => dispatch => {
  return axios({
    method: 'post',
    url: profilPictureUrl,
    data: {pictureUrl}
  })
  .then((data) => dispatch({type: constants.PROFIL_PICTURE_SUCCESS, payload: data}))
  .catch((err) => dispatch({type: constants.PROFIL_PICTURE_FAILURE, payload: err}))
}

export const getProfilPicture = () => dispatch => {
  return axios({
    method: 'get',
    url: profilPictureUrl
  })
  .then((data) => dispatch({type: constants.PROFIL_PICTURE_SUCCESS, payload: data}))
  .catch((err) => dispatch({type: constants.PROFIL_PICTURE_FAILURE, payload: err}))
}

