import axios from 'axios'
import config from '../../config/config'
import * as constants from './constants'

const url = `${config.API_BASE_URI}/pictures`

export const fetchPictures = () => dispatch => {
  dispatch({type: constants.FETCH_PICTURES_REQUEST})
  return axios({
    method: 'get',
    url
  })
  .then((data) => dispatch({type: constants.FETCH_PICTURES_SUCCESS, payload: data}))
  .catch((err) => dispatch({type: constants.FETCH_PICTURES_FAILURE, payload: err}))
}

export const uploadPicture = (data) => dispatch => {
  dispatch({type: constants.UPLOAD_PICTURE_REQUEST})
  return axios({
    method: 'post',
    url,
    data
  })
  .then((data) => dispatch({type: constants.UPLOAD_PICTURE_SUCCESS, payload: data}))
  .catch((err) => dispatch({type: constants.UPLOAD_PICTURE_FAILURE, payload: err}))
}

export const deletePicture = (pictureUrl, index) => dispatch => {
  dispatch({type: constants.UPLOAD_PICTURE_REQUEST})
  return axios({
    method: 'delete',
    url,
    data: {picture: {url: pictureUrl, index}}
  })
  .then(() => dispatch({type: constants.UPLOAD_PICTURE_SUCCESS}))
  .catch((err) => dispatch({type: constants.UPLOAD_PICTURE_FAILURE, payload: err}))
}
