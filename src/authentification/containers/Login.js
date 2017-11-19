import { connect } from 'react-redux'
import { login } from '../actions'

import Login from '../components/Login'

export default connect(
  (state) => ({
    isAutenticating: state.login.isFetching,
    error: state.login.error
  }),
  { login }
)(Login)
