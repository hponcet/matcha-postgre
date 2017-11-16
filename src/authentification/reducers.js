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
      return { isAuthenticating: false, error: payload }
    case constants.SIGNUP_SUCCESS:
      return { isAuthenticating: false, error: null }
    default:
      return state
  }
}
