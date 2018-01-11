import * as constants from './constants'
import axios from 'axios'
import config from '../config/config'

export const fetchHistory = () => dispatch => {
  dispatch({ type: constants.FETCH_HISTORY_REQUEST })
  axios({
    method: 'get',
    url: `${config.API_BASE_URI}/history`
  })
  .then((profil) => dispatch({type: constants.FETCH_HISTORY_SUCCESS, payload: profil.data}))
  .catch((error) => dispatch({type: constants.FETCH_HISTORY_FAILURE, payload: error}))
}

export const archiveNews = (newsId) => dispatch => {
  dispatch({ type: constants.FETCH_HISTORY_REQUEST })
  axios({
    method: 'put',
    url: `${config.API_BASE_URI}/history`,
    data: {newsId}
  })
  .then((profil) => dispatch({type: constants.FETCH_HISTORY_SUCCESS, payload: profil.data}))
  .catch((error) => dispatch({type: constants.FETCH_HISTORY_FAILURE, payload: error}))
}

export const archiveAllNews = () => dispatch => {
  dispatch({ type: constants.FETCH_HISTORY_REQUEST })
  axios({
    method: 'post',
    url: `${config.API_BASE_URI}/history`
  })
  .then((profil) => dispatch({type: constants.FETCH_HISTORY_SUCCESS, payload: profil.data}))
  .catch((error) => dispatch({type: constants.FETCH_HISTORY_FAILURE, payload: error}))
}
