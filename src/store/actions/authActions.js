import axios from 'axios'
import { API_URL } from '../../api'
import { toast } from 'react-toastify'

export const signUp = (user) => {
  return (dispatch) => {
    axios
      .post(`${API_URL}/signup`, user)
      .then((token) => {
        localStorage.setItem('token', token.data)

        dispatch({
          type: "SIGN_UP",
          token: token.data
        })
      })
      .catch((error) => {
        console.log(error.response)

        toast.error(error.response?.data, {
          position: toast.POSITION.TOP_RIGHT
        })
      })
  }
}

export const signIn = (email, password) => {
  return (dispatch) => {
    axios.post(`${API_URL}/signin`, {
      email,
      password
    })
      .then((token) => {
        localStorage.setItem('token', token.data)

        dispatch({
          type: 'SIGN_IN',
          token: token.data
        })
      })
      .catch((error) => {
        console.log(error.response)

        toast.error(error.response?.data, {
          position: toast.POSITION.TOP_RIGHT
        })
      })
  }
}

export const signOut = () => {
  return (dispatch) => {
    dispatch({
      type: 'SIGN_OUT'
    })
  }
}

export const loadUser = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token
    if (token) {
      dispatch({
        type: "USER_LOADED",
        token
      })
    } else {
      return null
    }
  }
}
