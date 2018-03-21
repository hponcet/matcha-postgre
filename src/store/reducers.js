import { combineReducers } from 'redux'
import locationReducer from './location'
import { SignupReducer, LoginReducer } from '../authentification/reducers'
import { UserReducer } from '../interface/reducers'
import { NotificationReducer } from '../notifications/reducers'
import { HistoryReducer } from '../history/reducers'
import { ThreadsReducer, ChatReducer } from '../chat/reducers'
import { ProfilReducer, PublicProfilReducer, UserLocationReducer } from '../profil/reducers'
import { SearchReducer } from '../finder/reducers'
import { TagsReducer } from '../styled-components/tags/reducers'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    signup: SignupReducer,
    login: LoginReducer,
    user: UserReducer,
    profil: ProfilReducer,
    publicProfil: PublicProfilReducer,
    search: SearchReducer,
    tags: TagsReducer,
    notifications: NotificationReducer,
    history: HistoryReducer,
    threads: ThreadsReducer,
    chat: ChatReducer,
    userLocation: UserLocationReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
