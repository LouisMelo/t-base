import axios from 'axios'
import { API_URL, setHeaders } from '../../api'
import { toast } from 'react-toastify'

export const getTransactions = () => {
  return (dispatch) => {
    axios.get(`${API_URL}/transactions`, setHeaders())
      .then((transactions) => {
        dispatch({
          type: 'GET_TRANSACTIONS',
          transactions
        })
      })
      .catch((error) => {
        console.log(error.response)
      })
  }
}

export const addTransaction = (transaction) => {
  return (dispatch) => {
    axios.post(`${API_URL}/transactions`, transaction, setHeaders())
      .then((transaction) => {
        dispatch({
          type: "ADD_TRANSACTION",
          transaction
        })
      })
      .catch((error) => {
        console.log(error.response)

        toast.error(error.response?.data, {
          position: toast.POSITION.BOTTOM_RIGHT
        })
      })
  }
}
