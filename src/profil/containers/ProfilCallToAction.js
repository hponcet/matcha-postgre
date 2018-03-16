import { connect } from 'react-redux'

import ProfilCallToAction from '../components/ProfilCallToAction'
import { like } from '../actions'

export default connect(
  (state) => ({
    user: state.profil,
    liked: state.publicProfil.liked,
    chatId: state.publicProfil.chatId
  }), {
    like
  }
)(ProfilCallToAction)
