import { connect } from 'react-redux'

import History from '../components/History'

export default connect((state) => ({
  profilFetching: state.profil.isFetching,
  pictures: state.profil.pictures,
  history: state.profil.history
})
)(History)
