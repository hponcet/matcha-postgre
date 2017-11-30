import { connect } from 'react-redux'

import Pictures from '../components/Pictures'
import {
  fetchPictures,
  uploadPicture,
  deletePicture } from '../actions'

export default connect(
  (state) => ({
    pictures: state.pictures.data,
    onUpload: state.pictures.onUpload,
    errors: state.pictures.error
  }), {
    fetchPictures,
    uploadPicture,
    deletePicture
  }
)(Pictures)
