import axios from 'axios'
import qs from 'qs'
import applyAuth from './interceptors/auth'

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'comma' }),
  headers: {
    CORS: '*',
  },
})

applyAuth(httpClient)

export default httpClient
