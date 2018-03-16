import { connect } from 'react-redux'
import { getHistory } from '../actions'
import History from '../components/History'

export default connect((state) => ({
  profilFetching: state.profil.isFetching,
  pictures: state.profil.pictures,
  news: state.history.news,
  archived: state.history.archived
}), {getHistory}
)(History)
