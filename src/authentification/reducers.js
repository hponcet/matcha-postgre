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
