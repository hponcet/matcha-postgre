import * as constants from './constants'

const initialPicturesState = {
  onUpload: false,
  profilPicture: constants.EMPTY_PICTURE,
  data: null,
  error: null
}
export const PicturesUploadReducer = (state = initialPicturesState, { type, payload }) => {
  switch (type) {
    case constants.UPLOAD_PICTURE_REQUEST:
      return { ...state, onUpload: true }
    case constants.UPLOAD_PICTURE_SUCCESS:
      return { ...state, onUpload: false, error: null, data: payload.data }
    case constants.UPLOAD_PICTURE_FAILURE:
      return { ...state, onUpload: false, error: payload }

    case constants.FETCH_PICTURES_REQUEST:
      return { ...state, onUpload: true }
    case constants.FETCH_PICTURES_SUCCESS:
      return { ...state, onUpload: false, error: null, data: payload.data }
    case constants.FETCH_PICTURES_FAILURE:
      return { ...state, onUpload: false, error: payload }

    case constants.DELETE_PICTURE_REQUEST:
      return { ...state }
    case constants.DELETE_PICTURE_SUCCESS:
      return { ...state, onUpload: false, error: null, data: payload.data }
    case constants.DELETE_PICTURE_FAILURE:
      return { ...state, error: payload }

    case constants.PROFIL_PICTURE_SUCCESS:
      return { ...state, error: null, profilPicture: payload.data }
    case constants.PROFIL_PICTURE_FAILURE:
      return { ...state, error: payload }

    default:
      return state
  }
}
