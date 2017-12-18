import * as constants from './constants'

const initialProfilsState = {
  profilsRequesting: false,
  data: null,
  error: null
}
export const ProfilsReducer = (state = initialProfilsState, { type, payload }) => {
  switch (type) {
    case constants.GET_PROFILS_REQUEST:
      return { ...state, profilsRequesting: true }
    case constants.GET_PROFILS_SUCCESS:
      return { ...state, profilsRequesting: false, error: null, data: payload }
    case constants.GET_PROFILS_FAILURE:
      return { ...state, profilsRequesting: false, error: payload }
    default:
      return state
  }
}
