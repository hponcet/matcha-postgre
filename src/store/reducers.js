import { combineReducers } from 'redux'
import locationReducer from './location'

// Import all reducers here

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // past reducers here like class: classesReducers
    location: locationReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
