import { connect } from 'react-redux'

import Location from '../components/Location'
import { getGeocode } from '../actions'

export default connect(
  (state) => ({
    currentLocation: state.profil.location
  }), {
    getGeocode
  }
)(Location)
