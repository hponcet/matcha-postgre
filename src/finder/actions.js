import * as constants from './constants'
import axios from 'axios'
import config from '../config/config'

const prev = []

export const getProfils = (offset, order) => dispatch => {
  dispatch({ type: constants.GET_PROFILS_REQUEST })
  axios({
    method: 'post',
    url: `${config.API_BASE_URI}/profils`,
    data: {
      offset: offset || 0,
      order: order || 0
    }
  })
  .then((profils) => {
    const map = require('lodash/map')
    map(profils.data.data, (profil) => {
      if (prev.indexOf(profil.pseudo) > 1) console.log(profil.pseudo)
      prev.push(profil.pseudo)
    })
    dispatch({type: constants.GET_PROFILS_SUCCESS, payload: profils.data})
  })
  .catch((error) => dispatch({type: constants.GET_PROFILS_FAILURE, payload: error}))
}

export const searchProfils = (search) => dispatch => {
  dispatch({ type: constants.GET_PROFILS_REQUEST })
  return axios({
    method: 'post',
    url: `${config.API_BASE_URI}/profils/search`,
    data: search
  })
  .then((profils) => dispatch({type: constants.GET_PROFILS_SUCCESS, payload: profils.data}))
  .catch((error) => dispatch({type: constants.GET_PROFILS_FAILURE, payload: error}))
}
