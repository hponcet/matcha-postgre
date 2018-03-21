import { connect } from 'react-redux'

import ChatText from '../components/ChatText'
import { sendMessage, fetchThreads } from '../actions'

export default connect(
  (state) => ({}), { sendMessage, fetchThreads }
)(ChatText)
