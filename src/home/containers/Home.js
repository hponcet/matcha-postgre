import { connect } from 'react-redux'

import Home from '../components/Home'

export default connect(
  (state) => ({
    profil: state.profil
  }), null
)(Home)
