import * as constants from './constants'

const initialHistoryState = {
  fetching: false,
  news: [],
  archived: [],
  error: null
}
export const HistoryReducer = (state = initialHistoryState, { type, payload }) => {
  switch (type) {
    case constants.GET_HISTORY_REQUEST:
      return { ...state, fetching: true }
    case constants.GET_HISTORY_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: null,
        news: payload.news,
        archived: payload.archived
      }
    case constants.GET_HISTORY_FAILURE:
      return { ...state, fetching: false, error: payload }
    default:
      return state
  }
}
