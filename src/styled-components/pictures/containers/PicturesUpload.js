import { connect } from 'react-redux'

import PicturesUpload from '../components/PicturesUpload'
import {
  uploadPicture,
  deletePicture,
  updateProfilPicture } from '../actions'

export default connect(
  (state) => ({
    pictures: state.profil.pictures,
    onUpload: state.profil.profilFetching,
    errors: state.profil.error
  }), {
    uploadPicture,
    deletePicture,
    updateProfilPicture
  }
)(PicturesUpload)
