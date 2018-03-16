import { connect } from 'react-redux'

import NewsButton from '../components/NewsButton'
import {getNotifications, archiveNews, archiveAllNews} from '../actions'

export default connect((state) => ({
  notifications: state.notifications.data,
  profilPicture: state.profil.profilPicture
}), {
  getNotifications,
  archiveNews,
  archiveAllNews
}
)(NewsButton)
