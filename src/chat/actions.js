import * as constants from './constants'
import axios from 'axios'
import config from '../config/config'

export const fetchThreads = () => dispatch => {
  dispatch({ type: constants.FETCH_THREADS_REQUEST })
  axios({
    method: 'get',
    url: `${config.API_BASE_URI}/chat`
  })
  .then((threads) => dispatch({type: constants.FETCH_THREADS_SUCCESS, payload: threads.data}))
  .catch((error) => dispatch({type: constants.FETCH_THREADS_FAILURE, payload: error}))
}

export const getThread = (chatId) => dispatch => {
  dispatch({ type: constants.GET_CHAT_REQUEST })
  axios({
    method: 'post',
    url: `${config.API_BASE_URI}/chat`,
    data: {chatId}
  })
  .then((threads) => dispatch({type: constants.GET_CHAT_SUCCESS, payload: threads.data}))
  .catch((error) => dispatch({type: constants.GET_CHAT_FAILURE, payload: error}))
}

export const sendMessage = (message) => dispatch => {
  dispatch({ type: constants.SEND_MESSAGE_REQUEST })
  axios({
    method: 'post',
    url: `${config.API_BASE_URI}/chat/message`,
    data: {message}
  })
  .then(() => dispatch({type: constants.SEND_MESSAGE_SUCCESS}))
  .catch((error) => dispatch({type: constants.GET_CHAT_FAILURE, payload: error}))
}
