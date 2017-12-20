import * as constants from './constants'
import axios from 'axios'
import config from '../config/config'

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
