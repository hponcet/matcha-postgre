import { connect } from 'react-redux'

import ProfilView from '../components/ProfilView'
import { getProfil } from '../actions'

export default connect(
  (state) => ({
    profil: state.publicProfil,
    user: state.profil
  }), {
    getProfil
  }
)(ProfilView)
