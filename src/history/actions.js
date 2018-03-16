import * as constants from './constants'
import axios from 'axios'
import config from '../config/config'

export const getHistory = () => dispatch => {
  dispatch({ type: constants.GET_HISTORY_REQUEST })
  axios({
    method: 'get',
    url: `${config.API_BASE_URI}/history`
  })
  .then((history) => dispatch({type: constants.GET_HISTORY_SUCCESS, payload: history.data}))
  .catch((error) => dispatch({type: constants.GET_HISTORY_FAILURE, payload: error}))
}
