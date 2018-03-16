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
  history: null,
  notifications: null,
  score: 0
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
        history: payload.history,
        notifications: payload.notifications,
        score: payload.score
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
  distance: null,
  liked: null,
  score: 0,
  location: [],
  chatId: null,
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
        profilPicture: payload.data.profilPicture,
        score: payload.data.score,
        distance: payload.data.distance,
        liked: payload.data.liked,
        chatId: payload.data.chatId
      }
    case constants.GET_LIKES_SUCCESS:
      return { ...state, isFetching: false, liked: payload.data.liked, chatId: payload.data.chatId }
    case constants.GET_PROFIL_FAILURE:
      return { ...state, isFetching: false, error: payload }
    default:
      return state
  }
}
