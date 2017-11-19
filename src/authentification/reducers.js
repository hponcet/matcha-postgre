import * as constants from './constants'

const initialSignupState = {
  isAuthenticating: false,
  error: null
}
export const SignupReducer = (state = initialSignupState, { type, payload }) => {
  switch (type) {
    case constants.SIGNUP_REQUEST:
      return { ...state, isAuthenticating: true }
    case constants.SIGNUP_FAILURE:
      return { ...state, isAuthenticating: false, error: payload }
    case constants.SIGNUP_SUCCESS:
      return { ...state, isAuthenticating: false, error: null }
    default:
      return state
  }
}

const initialLoginState = {
  isAuthenticating: false,
  error: null
}
export const LoginReducer = (state = initialLoginState, { type, payload }) => {
  switch (type) {
    case constants.LOGIN_REQUEST:
      return { ...state, isAuthenticating: true }
    case constants.LOGIN_FAILURE:
      return { ...state, isAuthenticating: false, error: payload }
    case constants.LOGIN_SUCCESS:
      return { ...state, isAuthenticating: false, error: null }
    default:
      return state
  }
}

const initialUserState = {
  data: null,
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
      return { ...state, isFetching: false, error: null, data: payload }
    default:
      return state
  }
}
