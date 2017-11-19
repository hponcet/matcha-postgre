import axios from 'axios'

export const initErrorInterceptor = () => {
  axios.interceptors.response.use(null, (error) => {
    if (error.response) {
      if (error.response.data.code) {
        error.appCode = error.response.data.code
      } else {
        error.appCode = 'UNKNOWN_ERROR'
      }
    } else if (error.request) {
      error.appCode = 'NETWORK_ERROR'
    } else {
      error.appCode = 'UNKNOWN_ERROR'
    }
    console.error(error)
    return Promise.reject(error)
  })
}
