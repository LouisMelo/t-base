import axios from 'axios'
import { API_URL, setHeaders } from '../../api'

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
