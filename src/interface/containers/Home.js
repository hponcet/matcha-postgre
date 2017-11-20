import { connect } from 'react-redux'
import { fetchUser } from '../actions'

import Home from '../components/Home'

export default connect(
  (state) => ({}),
  { fetchUser }
)(Home)
