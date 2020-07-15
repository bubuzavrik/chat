import {combineReducers, applyMiddleware, createStore} from 'redux'
import { routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import userReducer from './reducers/userReducer.js'
import pageReducer from './reducers/pageReducer.js'

export default createStore(
  combineReducers({
    routing: routerReducer,
    user: userReducer,
    page: pageReducer
  }),
  {},
  applyMiddleware(logger, thunk)
)
