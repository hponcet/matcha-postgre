import * as constants from './constants'

const initialProfilState = {
  isUpdating: false,
  isFetching: false,
  error: null,
  pseudo: null,
  birthday: Date.now(),
  profilError: null,
  pictures: [],
  tags: [],
  sex: null,
  orientation: null,
  biography: null,
  profilPicture: null,
  location: [],
  likes: [],
  userId: null,
  id: null,
  history: null
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
        pictures: payload.pictures,
        id: payload.id,
        birthday: payload.birthday,
        pseudo: payload.pseudo,
        location: payload.location,
        tags: payload.tags,
        sex: payload.sex,
        orientation: payload.orientation,
        biography: payload.biography,
        profilPicture: payload.profilPicture,
        likes: payload.likes,
        history: payload.history
      }
    case constants.FETCH_PROFIL_FAILURE:
      return { ...state, isFetching: false, error: payload }
    default:
      return state
  }
}

const initialPublicProfilState = {
  isFetching: false,
  error: null,
  tags: [],
  pictures: [],
  pseudo: null,
  sex: null,
  birthday: Date.now(),
  orientation: null,
  biography: null,
  profilPicture: null,
  profilScore: 0,
  location: [],
  consultedBy: [],
  likes: [],
  id: null
}
export const PublicProfilReducer = (state = initialPublicProfilState, { type, payload }) => {
  switch (type) {
    case constants.GET_PROFIL_REQUEST:
      return { ...state, isFetching: true }
    case constants.GET_PROFIL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        pictures: payload.data.pictures,
        id: payload.data.id,
        birthday: payload.data.birthday,
        pseudo: payload.data.pseudo,
        location: payload.data.location,
        tags: payload.data.tags,
        sex: payload.data.sex,
        orientation: payload.data.orientation,
        biography: payload.data.biography,
        profilPicture: payload.data.profilPicture
      }
    case constants.GET_PROFIL_FAILURE:
      return { ...state, isFetching: false, error: payload }
    default:
      return state
  }
}

const initialLikeReducer = {
  isFetching: false,
  data: [],
  error: null
}
export const LikeReducer = (state = initialLikeReducer, { type, payload }) => {
  switch (type) {
    case constants.LIKE_PROFIL_REQUEST:
      return { ...state, isFetching: true }
    case constants.LIKE_PROFIL_SUCCESS:
      return { ...state, isFetching: false, error: null, data: payload.data }
    case constants.LIKE_PROFIL_FAILURE:
      return { ...state, isFetching: false, error: payload }
    default:
      return state
  }
}

const initialProfilsState = {
  profilsRequesting: false,
  data: null,
  error: null
}
export const ProfilsReducer = (state = initialProfilsState, { type, payload }) => {
  switch (type) {
    case constants.GET_PROFILS_REQUEST:
      return { ...state, profilsRequesting: true }
    case constants.GET_PROFILS_SUCCESS:
      return { ...state, profilsRequesting: false, error: null, data: payload }
    case constants.GET_PROFILS_FAILURE:
      return { ...state, profilsRequesting: false, error: payload }
    default:
      return state
  }
}
