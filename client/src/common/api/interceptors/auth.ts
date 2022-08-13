import { getAuthCredentials } from '@api/resources/users/tools'
import type { AxiosInstance } from 'axios'

export default (axios: AxiosInstance) => {
  axios.interceptors.request.use(config => {
    const { accessToken } = getAuthCredentials()

    if (accessToken) {
      config.headers!['token'] = 'Bearer ' + accessToken
    }

    return config
  })
}
