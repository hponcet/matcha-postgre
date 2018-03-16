import * as constants from './constants'

const initialThreadsState = {
  threadsFetching: false,
  threads: null,
  error: null
}
export const ThreadsReducer = (state = initialThreadsState, { type, payload }) => {
  switch (type) {
    case constants.FETCH_THREADS_REQUEST:
      return { ...state, threadsFetching: true }
    case constants.FETCH_THREADS_SUCCESS:
      return { ...state, threadsFetching: false, error: null, threads: payload }
    case constants.FETCH_THREADS_FAILURE:
      return { ...state, threadsFetching: false, error: payload }
    default:
      return state
  }
}

const initialChatState = {
  chatFetching: false,
  userPicture: null,
  profilPicture: null,
  messages: [],
  error: null
}
export const ChatReducer = (state = initialChatState, { type, payload }) => {
  switch (type) {
    case constants.GET_CHAT_REQUEST:
      return { ...state, chatFetching: true }
    case constants.GET_CHAT_SUCCESS:
      return {
        ...state,
        chatFetching: false,
        error: null,
        userPicture: payload.userPicture,
        profilPicture: payload.profilPicture,
        messages: payload.messages
      }
    case constants.GET_CHAT_FAILURE:
      return { ...state, chatFetching: false, error: payload }
    default:
      return state
  }
}
