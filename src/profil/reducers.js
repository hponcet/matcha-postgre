import * as constants from './constants'

const initialProfilState = {
  isSending: false,
  error: null
}
export const ProfilReducer = (state = initialProfilState, { type, payload }) => {
  switch (type) {
    case constants.PROFIL_REQUEST:
      return { ...state, isSending: true }
    case constants.PROFIL_SUCCESS:
      return { ...state, isSending: false, error: null, data: payload }
    case constants.PROFIL_FAILURE:
      return { ...state, isSending: false, error: payload }
    default:
      return state
  }
}
