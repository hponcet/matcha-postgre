import * as constants from './constants'

const initialProfilState = {
  isUpdating: false,
  isFetching: false,
  error: null,
  tags: [],
  sex: null,
  orientation: null,
  biography: null,
  profilPicture: null,
  profilScore: 0,
  consultedBy: [],
  likes: []

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
      return {
        ...state,
        isFetching: false,
        error: null,
        userId: payload.userId,
        tags: payload.tags,
        sex: payload.sex,
        orientation: payload.orientation,
        biography: payload.biography,
        profilPicture: payload.profilPicture,
        profilScore: payload.profilScore,
        consultedBy: payload.consultedBy,
        likes: payload.likes
      }
    case constants.FETCH_PROFIL_FAILURE:
      return { ...state, isFetching: false, error: payload }
    default:
      return state
  }
}
