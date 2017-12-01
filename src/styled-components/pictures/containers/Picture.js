import { connect } from 'react-redux'

import Picture from '../components/Picture'
import { deletePicture, updateProfilPicture } from '../actions'

export default connect(
  (state) => ({
    errors: state.pictures.error,
    profilPicture: state.pictures.profilPicture
  }), { deletePicture, updateProfilPicture }
)(Picture)
