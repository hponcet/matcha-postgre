import * as constants from './constants'

const initialUserState = {
  data: null,
  pseudo: null,
  id: null,
  email: null,
  profilId: null,
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
        id: payload._id,
        pseudo: payload.pseudo,
        sex: payload.sex,
        profilId: payload.profilId,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName
      }
    default:
      return state
  }
}
