import * as constants from './constants'
import axios from 'axios'
import config from '../config/config'

export const getNotifications = () => dispatch => {
  dispatch({ type: constants.GET_NOTIFICATIONS_REQUEST })
  axios({
    method: 'post',
    url: `${config.API_BASE_URI}/notifications`,
    data: {status: 'NOTIFICATION'}
  })
  .then((history) => dispatch({type: constants.GET_NOTIFICATIONS_SUCCESS, payload: history.data}))
  .catch((error) => dispatch({type: constants.GET_NOTIFICATIONS_FAILURE, payload: error}))
}

export const archiveNews = (newsId) => dispatch => {
  dispatch({ type: constants.GET_NOTIFICATIONS_REQUEST })
  axios({
    method: 'delete',
    url: `${config.API_BASE_URI}/notifications`,
    data: {newsId}
  })
  .then((profil) => dispatch({type: constants.GET_NOTIFICATIONS_SUCCESS, payload: profil.data}))
  .catch((error) => dispatch({type: constants.GET_NOTIFICATIONS_FAILURE, payload: error}))
}

export const archiveAllNews = () => dispatch => {
  dispatch({ type: constants.GET_NOTIFICATIONS_REQUEST })
  axios({
    method: 'delete',
    url: `${config.API_BASE_URI}/notifications/all`
  })
  .then((profil) => dispatch({type: constants.GET_NOTIFICATIONS_SUCCESS, payload: profil.data}))
  .catch((error) => dispatch({type: constants.GET_NOTIFICATIONS_FAILURE, payload: error}))
}
