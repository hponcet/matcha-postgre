import { connect } from 'react-redux'

import Finder from '../components/Finder'

export default connect(
  (state) => ({
    location: state.profil.location || null
  }), null
)(Finder)
