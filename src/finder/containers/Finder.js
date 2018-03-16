import { connect } from 'react-redux'

import Finder from '../components/Finder'
import { getProfils, searchProfils } from '../actions'

export default connect(
  (state) => ({
    location: state.profil.location || null,
    pictures: state.profil.pictures,
    profilsRequesting: state.search.profilsRequesting,
    profils: state.search.data,
    offset: state.search.offset,
    error: state.search.error
  }), {
    getProfils,
    searchProfils
  }
)(Finder)
