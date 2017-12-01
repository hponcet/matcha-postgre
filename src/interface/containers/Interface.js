import { connect } from 'react-redux'
import { fetchUser } from '../actions'
import { fetchProfil } from '../../profil/actions'
import { fetchPictures, getProfilPicture } from '../../styled-components/pictures/actions'

import Interface from '../components/Interface'

export default connect(
  (state) => ({
    user: state.user.data
  }),
  { fetchUser, fetchProfil, fetchPictures, getProfilPicture }
)(Interface)
