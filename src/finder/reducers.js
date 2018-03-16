import * as constants from './constants'

const initialSearchState = {
  searching: false,
  offset: 0,
  data: null,
  error: null
}
export const SearchReducer = (state = initialSearchState, { type, payload }) => {
  switch (type) {
    case constants.GET_PROFILS_REQUEST:
      return { ...state, searching: true }
    case constants.GET_PROFILS_SUCCESS:
      return {
        ...state,
        searching: false,
        error: null,
        offset: payload.offset,
        data: payload.data
      }
    case constants.GET_PROFILS_FAILURE:
      return { ...state, searching: false, error: payload }
    default:
      return state
  }
}
