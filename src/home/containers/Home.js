import { connect } from 'react-redux'

import Home from '../components/Home'

export default connect(
  (state) => ({
    pseudo: state.user.pseudo,
    id: state.user.id,
    profil: state.user.profil
  }), null
)(Home)
