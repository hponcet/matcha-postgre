import { connect } from 'react-redux'

import Picture from '../components/Picture'
import { deletePicture, updateProfilPicture } from '../actions'

export default connect(
  (state) => ({
    errors: state.profil.error,
    profilPicture: state.profil.profilPicture
  }), { deletePicture, updateProfilPicture }
)(Picture)
