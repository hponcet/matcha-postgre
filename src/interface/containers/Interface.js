import { connect } from 'react-redux'
import { fetchProfil } from '../../profil/actions'
import { fetchPictures, getProfilPicture } from '../../styled-components/pictures/actions'

import Interface from '../components/Interface'

export default connect(
  (state) => ({
    profil: state.profil,
    profilPicture: state.pictures ? state.pictures.profilPicture : null,
    isFetching: state.profil.isFetching
  }),
  { fetchProfil, fetchPictures, getProfilPicture }
)(Interface)
