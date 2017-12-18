import * as constants from './constants'

const initialProfilState = {
  isUpdating: false,
  isFetching: false,
  error: null,
  profilError: null,
  tags: [],
  sex: null,
  orientation: null,
  biography: null,
  profilPicture: null,
  profilScore: 0,
  location: [],
  consultedBy: [],
  likes: [],
  userId: null,
  profilId: null
}
export const ProfilReducer = (state = initialProfilState, { type, payload }) => {
  switch (type) {
    case constants.UPDATE_PROFIL_REQUEST:
      return { ...state, isUpdating: true }
    case constants.UPDATE_PROFIL_SUCCESS:
      return { ...state, isUpdating: false, profilError: null }
    case constants.UPDATE_PROFIL_FAILURE:
      return { ...state, isUpdating: false, profilError: payload }
    case constants.FETCH_PROFIL_REQUEST:
      return { ...state, isFetching: true }
    case constants.FETCH_PROFIL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        userId: payload.userId,
        profilId: payload._id,
        birthday: payload.birthday,
        pseudo: payload.pseudo,
        location: payload.location,
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
