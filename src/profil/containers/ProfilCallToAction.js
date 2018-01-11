import { connect } from 'react-redux'

import ProfilCallToAction from '../components/ProfilCallToAction'
import { like } from '../actions'

export default connect(
  (state) => ({
    user: state.profil,
    userLikes: state.likes.data
  }), {
    like
  }
)(ProfilCallToAction)
