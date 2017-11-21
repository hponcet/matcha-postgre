import * as constants from './constants'

const initialUserState = {
  data: null,
  pseudo: null,
  id: null,
  profil: null,
  error: null,
  isFetching: false
}
export const UserReducer = (state = initialUserState, { type, payload }) => {
  switch (type) {
    case constants.LOGOUT:
      return initialUserState
    case constants.FETCH_USER_REQUEST:
      return { ...state, isFetching: true }
    case constants.FETCH_USER_FAILURE:
      return { ...state, isFetching: false, error: payload }
    case constants.FETCH_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        data: payload,
        pseudo: payload.pseudo,
        id: payload._id,
        sex: payload.sex,
        profil: payload.profil
      }
    default:
      return state
  }
}
