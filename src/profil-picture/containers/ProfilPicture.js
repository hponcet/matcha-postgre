import { connect } from 'react-redux'

import ProfilsPicture from '../components/ProfilPicture'

export default connect(
  (state) => ({
    userProfil: state.profil
  })
)(ProfilsPicture)
