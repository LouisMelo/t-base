export const API_URL = 'http://localhost:5000/api'

export const setHeaders = () => {
  return {
    headers: {
      'x-auth-token': localStorage.getItem('token')
    }
  }
}
