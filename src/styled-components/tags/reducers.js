import * as constants from './constants'

const initialTagsState = {
  onProgress: false,
  tags: [],
  error: null
}
export const TagsReducer = (state = initialTagsState, { type, payload }) => {
  switch (type) {
    case constants.FETCH_TAGS_REQUEST:
      return { ...state, onProgress: true }
    case constants.FETCH_TAGS_SUCCESS:
      return { ...state, onProgress: false, error: null, data: payload }
    case constants.FETCH_TAGS_FAILURE:
      return { ...state, onProgress: false, error: payload }
    case constants.TAG_OPERATION_REQUEST:
      return { ...state, onProgress: true }
    case constants.TAG_OPERATION_SUCCESS:
      return { ...state, onProgress: false }
    case constants.TAG_OPERATION_FAILURE:
      return { ...state, onProgress: false, error: payload }
    default:
      return state
  }
}
