import axios from 'axios'
import config from '../../config/config'
import * as constants from './constants'

export const fetchTags = () => dispatch => {
  dispatch({type: constants.FETCH_TAGS_REQUEST})
  return axios({
    method: 'get',
    url: `${config.API_BASE_URI}/tags`
  })
  .then((tags) => dispatch({type: constants.FETCH_TAGS_SUCCESS, payload: tags}))
  .catch((err) => dispatch({type: constants.FETCH_TAGS_FAILURE, payload: err}))
}

export const updateTag = (tagName, id) => dispatch => {
  dispatch({type: constants.TAG_OPERATION_REQUEST})
  return axios({
    method: 'update',
    url: `${config.API_BASE_URI}/tags`,
    data: {tagName, id}
  })
  .then(() => dispatch({type: constants.TAG_OPERATION_SUCCESS}))
  .catch((err) => dispatch({type: constants.TAG_OPERATION_FAILURE, payload: err}))
}

export const addTag = (tag) => dispatch => {
  dispatch({type: constants.TAG_OPERATION_REQUEST})
  return axios({
    method: 'post',
    url: `${config.API_BASE_URI}/tags`,
    data: tag
  })
  .then(() => dispatch({type: constants.TAG_OPERATION_SUCCESS}))
  .catch((err) => dispatch({type: constants.TAG_OPERATION_FAILURE, payload: err}))
}

export const removeTag = (tagName, id) => dispatch => {
  dispatch({type: constants.TAG_OPERATION_REQUEST})
  return axios({
    method: 'delete',
    url: `${config.API_BASE_URI}/tags`,
    data: {tagName, id}
  })
  .then(() => dispatch({type: constants.TAG_OPERATION_SUCCESS}))
  .catch((err) => dispatch({type: constants.TAG_OPERATION_FAILURE, payload: err}))
}
