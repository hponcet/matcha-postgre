import * as constants from './constants'

const initialNotificationsState = {
  fetching: false,
  data: [],
  error: null
}
export const NotificationReducer = (state = initialNotificationsState, { type, payload }) => {
  switch (type) {
    case constants.GET_NOTIFICATIONS_REQUEST:
      return { ...state, fetching: true }
    case constants.GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: null,
        data: payload
      }
    case constants.GET_NOTIFICATIONS_FAILURE:
      return { ...state, fetching: false, error: payload }
    default:
      return state
  }
}
