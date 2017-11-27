import * as constants from './constants'

const initialProfilState = {
  isUpdating: false,
  isFetching: false,
  error: null,
  tags: [],
  sex: null,
  orientation: null,
  biography: null,
  pictures: [],
  profilPicture: null
}
export const ProfilReducer = (state = initialProfilState, { type, payload }) => {
  switch (type) {
    case constants.UPDATE_PROFIL_REQUEST:
      return { ...state, isUpdating: true }
    case constants.UPDATE_PROFIL_SUCCESS:
      return { ...state, isUpdating: false, error: null }
    case constants.UPDATE_PROFIL_FAILURE:
      return { ...state, isUpdating: false, error: payload }
    case constants.FETCH_PROFIL_REQUEST:
      return { ...state, isFetching: true }
    case constants.FETCH_PROFIL_SUCCESS:
      console.log(payload)
      return {
        ...state,
        isFetching: false,
        error: null,
        userId: payload.userId,
        tags: payload.tags,
        sex: payload.sex,
        orientation: payload.orientation,
        biography: payload.biography,
        pictures: payload.pictures,
        profilPicture: payload.profilPicture
      }
    case constants.FETCH_PROFIL_FAILURE:
      return { ...state, isFetching: false, error: payload }
    default:
      return state
  }
}
