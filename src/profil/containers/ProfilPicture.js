import { connect } from 'react-redux'

import ProfilsPicture from '../components/ProfilPicture'
import { profilView } from '../actions'

export default connect(
  (state) => ({
    userProfil: state.profil
  }),
  {
    profilView
  }
)(ProfilsPicture)
