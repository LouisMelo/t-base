import { combineReducers } from 'redux'
import transactionReducer from './transactionReducer'
import authReducer from './authReducer'

const rootReducer = combineReducers({
  transactions: transactionReducer,
  auth: authReducer,
})

export default rootReducer
