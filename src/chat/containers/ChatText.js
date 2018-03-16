import { connect } from 'react-redux'

import ChatText from '../components/ChatText'
import { sendMessage } from '../actions'

export default connect(
  (state) => ({}), { sendMessage }
)(ChatText)
