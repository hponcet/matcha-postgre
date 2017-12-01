import { connect } from 'react-redux'

import Picture from '../components/Picture'
import { deletePicture } from '../actions'

export default connect(
  (state) => ({ errors: state.pictures.error }), { deletePicture }
)(Picture)
