import axios from 'axios'
import { API_URL, setHeaders } from '../../api'

import { getTransactions } from './transactionActions'

export const getMergers = () => {
  return (dispatch) => {
    axios
      .get(`${API_URL}/mergers`, setHeaders())
      .then((mergers) => {
        dispatch({
          type: 'GET_MERGERS',
          mergers
        })
      })
      .catch((error) => {
        console.log(error.response)
      })
  }
}

export const addMerger = (transactionIds) => {
  return (dispatch) => {
    axios
      .post(`${API_URL}/mergers`, { transactionIds }, setHeaders())
      .then((merger) => {
        dispatch({
          type: 'ADD_MERGER',
          merger
        })
        dispatch(getTransactions())
      })
      .catch((error) => {
        console.log(error.response)
      })
  }
}
