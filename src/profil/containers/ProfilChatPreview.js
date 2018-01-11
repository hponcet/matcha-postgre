import { connect } from 'react-redux'

import ProfilChatPreview from '../components/ProfilChatPreview'
import { getProfil } from '../actions'

export default connect(
  (state) => ({
    profil: state.publicProfil,
    user: state.profil
  }), {
    getProfil
  }
)(ProfilChatPreview)
