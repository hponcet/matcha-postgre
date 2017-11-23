import axios from 'axios'
import config from '../../config/config'
import * as constants from './constants'

const url = `${config.API_BASE_URI}/tags`

export const fetchTags = () => dispatch => {
  dispatch({type: constants.FETCH_TAGS_REQUEST})
  return axios({
    method: 'get',
    url
  })
  .then((tags) => dispatch({type: constants.FETCH_TAGS_SUCCESS, payload: tags}))
  .catch((err) => dispatch({type: constants.FETCH_TAGS_FAILURE, payload: err}))
}

export const updateTag = (name, id) => dispatch => {
  dispatch({type: constants.TAG_OPERATION_REQUEST})
  return axios({
    method: 'patch',
    url,
    data: {name, id}
  })
  .then(() => dispatch({type: constants.TAG_OPERATION_SUCCESS}))
  .catch((err) => dispatch({type: constants.TAG_OPERATION_FAILURE, payload: err}))
}

export const addTag = (name, id) => dispatch => {
  dispatch({type: constants.TAG_OPERATION_REQUEST})
  return axios({
    method: 'post',
    url,
    data: {name, id}
  })
  .then(() => dispatch({type: constants.TAG_OPERATION_SUCCESS}))
  .catch((err) => dispatch({type: constants.TAG_OPERATION_FAILURE, payload: err}))
}

export const removeTag = (name, id) => dispatch => {
  dispatch({type: constants.TAG_OPERATION_REQUEST})
  return axios({
    method: 'delete',
    url,
    data: {name, id}
  })
  .then(() => dispatch({type: constants.TAG_OPERATION_SUCCESS}))
  .catch((err) => dispatch({type: constants.TAG_OPERATION_FAILURE, payload: err}))
}
