import * as constants from './constants'

const initialUserState = {
  isFetching: false,
  error: null,
  id: null,
  pseudo: null,
  sex: null,
  email: null,
  firstname: null,
  lastname: null
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
        id: payload.id,
        pseudo: payload.pseudo,
        sex: payload.sex,
        email: payload.email,
        firstname: payload.firstname,
        lastname: payload.lastname
      }
    default:
      return state
  }
}
