import { connect } from 'react-redux'

import Profil from '../components/Profil'
import { updateProfil, fetchProfil } from '../actions'
import { fetchUser } from '../../interface/actions'

export default connect(
  (state) => ({
    isUpdating: state.profil.isUpdating,
    user: state.user,
    profil: state.profil,
    profilPicture: state.pictures.profilPicture,
    error: state.profil.error
  }), {
    updateProfil,
    fetchProfil,
    fetchUser
  }
)(Profil)
