import axios from 'axios'
import qs from 'qs'

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'comma' }),
})

export default httpClient
