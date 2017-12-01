import { connect } from 'react-redux'

import Profil from '../components/Profil'
import { updateProfil } from '../actions'

export default connect(
  (state) => ({
    user: state.user.data,
    profil: {
      sex: state.user.sex,
      profilPicture: state.pictures.profilPicture
    },
    error: state.profil.error
  }), {
    updateProfil
  }
)(Profil)
