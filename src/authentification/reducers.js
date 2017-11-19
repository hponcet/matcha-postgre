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
