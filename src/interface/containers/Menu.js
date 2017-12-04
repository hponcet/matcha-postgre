import { connect } from 'react-redux'
import { logoutAction } from '../actions'

import Menu from '../components/Menu'

export default connect(
  (state) => ({
    profilScore: state.profil ? state.profil.profilScore : 0
  }),
  { logout: logoutAction }
)(Menu)
