import { connect } from 'react-redux'

import Pictures from '../components/Pictures'
import {
  uploadPicture,
  deletePicture,
  updateProfilPicture } from '../actions'

export default connect(
  (state) => ({
    pictures: state.pictures.data,
    onUpload: state.pictures.onUpload,
    errors: state.pictures.error
  }), {
    uploadPicture,
    deletePicture,
    updateProfilPicture
  }
)(Pictures)
