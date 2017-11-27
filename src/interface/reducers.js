import * as constants from './constants'

const initialUserState = {
  isFetching: false,
  error: null,
  id: null,
  pseudo: null,
  sex: null,
  profilId: null,
  email: null,
  firstName: null,
  lastName: null
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
        id: payload._id.toString(),
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
