import * as constants from './constants'

const initialHistoryState = {
  historyFetching: false,
  data: null,
  error: null
}
export const HistoryReducer = (state = initialHistoryState, { type, payload }) => {
  switch (type) {
    case constants.FETCH_HISTORY_REQUEST:
      return { ...state, historyFetching: true }
    case constants.FETCH_HISTORY_SUCCESS:
      return { ...state, historyFetching: false, error: null, data: payload }
    case constants.FETCH_HISTORY_FAILURE:
      return { ...state, historyFetching: false, error: payload }
    default:
      return state
  }
}
