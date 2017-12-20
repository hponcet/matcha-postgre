import { connect } from 'react-redux'

import Finder from '../components/Finder'
import { searchProfils } from '../../profils-list/actions'

export default connect(
  (state) => ({
    location: state.profil.location || null
  }), {
    searchProfils
  }
)(Finder)
