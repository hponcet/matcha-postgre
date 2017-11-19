import { combineReducers } from 'redux'
import locationReducer from './location'
import { SignupReducer, LoginReducer, UserReducer } from '../authentification/reducers'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    signup: SignupReducer,
    login: LoginReducer,
    user: UserReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
