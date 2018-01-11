import { connect } from 'react-redux'

import ChatText from '../components/ChatText'
import { getChat, sendMessage } from '../actions'

export default connect((state) => ({
  threadContent: state.chat.data,
  fetching: state.chat.chatFetching,
  userProfilId: state.profil.profilId
}), {
  getChat,
  sendMessage
}
)(ChatText)
