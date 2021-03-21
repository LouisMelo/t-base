export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'

export const setHeaders = () => {
  return {
    headers: {
      'x-auth-token': localStorage.getItem('token')
    }
  }
}
