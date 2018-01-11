import { connect } from 'react-redux'

import NewsFeed from '../components/NewsFeed'
import {archiveNews} from '../actions'

export default connect(() => ({}), { archiveNews })(NewsFeed)
