import { connect } from 'react-redux'

import Profil from '../components/Profil'
import { updateProfil } from '../actions'

export default connect(
  (state) => ({
    email: state.user.email,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    profil: state.profil,
    profilPicture: state.pictures.profilPicture,
    error: state.profil.error
  }), {
    updateProfil
  }
)(Profil)
