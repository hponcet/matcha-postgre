import { connect } from 'react-redux'
import { fetchProfil, getLikes } from '../../profil/actions'

import Interface from '../components/Interface'

export default connect(
  (state) => ({
    profil: state.profil,
    profilPicture: state.pictures ? state.pictures.profilPicture : null,
    isFetching: state.profil.isFetching
  }),
  { fetchProfil, getLikes }
)(Interface)
