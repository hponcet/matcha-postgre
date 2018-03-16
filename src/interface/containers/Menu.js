import { connect } from 'react-redux'
import { logoutAction } from '../actions'

import Menu from '../components/Menu'

export default connect(
  (state) => ({
    profil: state.profil
  }),
  { logout: logoutAction }
)(Menu)
