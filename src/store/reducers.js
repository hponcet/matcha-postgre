import { combineReducers } from 'redux'
import locationReducer from './location'
import { SignupReducer, LoginReducer } from '../authentification/reducers'
import { UserReducer } from '../interface/reducers'
import { ProfilReducer, PublicProfilReducer } from '../profil/reducers'
import { ProfilsReducer } from '../profils-list/reducers'
import { TagsReducer } from '../styled-components/tags/reducers'
import { PicturesUploadReducer } from '../styled-components/pictures/reducers'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    signup: SignupReducer,
    login: LoginReducer,
    user: UserReducer,
    profil: ProfilReducer,
    publicProfil: PublicProfilReducer,
    profils: ProfilsReducer,
    tags: TagsReducer,
    pictures: PicturesUploadReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
