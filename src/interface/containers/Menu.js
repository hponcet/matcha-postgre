import { connect } from 'react-redux'
import { logoutAction } from '../actions'

import Menu from '../components/Menu'

export default connect(
  (state) => ({}),
  { logout: logoutAction }
)(Menu)
