import { connect } from 'react-redux'

import Finder from '../components/Finder'
import { searchProfils } from '../../profil/actions'

export default connect(
  (state) => ({
    location: state.profil.location || null,
    pictures: state.profil.pictures
  }), {
    searchProfils
  }
)(Finder)
