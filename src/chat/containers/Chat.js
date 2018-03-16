import { connect } from 'react-redux'

import Chat from '../components/Chat'
import { fetchThreads, getCurrentThread } from '../actions'

export default connect((state) => ({
  threadsFetching: state.threads.threadsFetching,
  userId: state.profil.id,
  threads: state.threads.threads,
  thread: state.chat
}), {
  fetchThreads,
  getCurrentThread
}
)(Chat)
