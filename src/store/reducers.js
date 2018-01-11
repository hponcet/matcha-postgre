import { combineReducers } from 'redux'
import locationReducer from './location'
import { SignupReducer, LoginReducer } from '../authentification/reducers'
import { UserReducer } from '../interface/reducers'
import { HistoryReducer } from '../notifications/reducers'
import { ThreadsReducer, ChatReducer } from '../chat/reducers'
import { ProfilReducer, ProfilsReducer, PublicProfilReducer, LikeReducer } from '../profil/reducers'
import { TagsReducer } from '../styled-components/tags/reducers'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    signup: SignupReducer,
    login: LoginReducer,
    user: UserReducer,
    profil: ProfilReducer,
    publicProfil: PublicProfilReducer,
    profils: ProfilsReducer,
    likes: LikeReducer,
    tags: TagsReducer,
    history: HistoryReducer,
    threads: ThreadsReducer,
    chat: ChatReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
