import { connect } from 'react-redux'

import NewsButton from '../components/NewsButton'
import {fetchHistory, archiveNews, archiveAllNews} from '../actions'

export default connect((state) => ({
  news: state.history.data && state.history.data.news ? state.history.data.news : [],
  profilPicture: state.profil.profilPicture
}), {
  fetchHistory,
  archiveNews,
  archiveAllNews
}
)(NewsButton)
