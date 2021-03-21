import { combineReducers } from 'redux'
import transactionReducer from './transactionReducer'
import authReducer from './authReducer'
import mergerReducer from './mergerReducer'

const rootReducer = combineReducers({
  transactions: transactionReducer,
  mergers: mergerReducer,
  auth: authReducer,
})

export default rootReducer
