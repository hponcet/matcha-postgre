import { connect } from 'react-redux'
import { signup } from '../actions'

import Signup from '../components/Signup'

export default connect(
  (state) => ({
    isAuthenticating: state.signup.isAuthenticating,
    error: state.signup.error
  }),
  { signup }
)(Signup)
