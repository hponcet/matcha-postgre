import { connect } from 'react-redux'

import ProfilEdit from '../components/ProfilEdit'
import { updateProfil, fetchProfil } from '../actions'
import { fetchUser } from '../../interface/actions'

export default connect(
  (state) => ({
    isUpdating: state.profil.isUpdating,
    user: state.user,
    profil: state.profil,
    profilPicture: state.pictures.profilPicture,
    profilError: state.profil.profilError,
    error: state.profil.error
  }), {
    updateProfil,
    fetchProfil,
    fetchUser
  }
)(ProfilEdit)
