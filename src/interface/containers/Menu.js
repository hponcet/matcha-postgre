import { connect } from 'react-redux'
import { logoutAction, fetchUser } from '../actions'

import Menu from '../components/Menu'

export default connect(
  (state) => ({}),
  { logout: logoutAction, fetchUser }
)(Menu)
