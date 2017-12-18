import { connect } from 'react-redux'

import ProfilsList from '../components/ProfilsList'
import { getProfils, searchProfils } from '../actions'

export default connect(
  (state) => ({
    profilsRequesting: state.profils.profilsRequesting,
    profils: state.profils.data,
    error: state.profils.error
  }), {
    getProfils,
    searchProfils
  }
)(ProfilsList)
