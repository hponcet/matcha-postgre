import { connect } from 'react-redux'

import Chat from '../components/Chat'
import { fetchThreads } from '../actions'

export default connect((state) => ({
  threads: state.threads.data,
  fetching: state.threads.threadsFetching,
  pictures: state.profil.pictures
}), {
  fetchThreads
}
)(Chat)
