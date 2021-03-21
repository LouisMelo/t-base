import axios from 'axios'
import { API_URL } from '../../api'

export const addTransaction = (transaction) => {
  return (dispatch, getState) => {
    axios.post(`${API_URL}/transactions`, transaction)
      .then((transaction) => {
        dispatch({
          type: "ADD_TRANSACTION",
          transaction
        })
      })
      .catch(error => {
        console.log(error.response)
      })
  }
}
