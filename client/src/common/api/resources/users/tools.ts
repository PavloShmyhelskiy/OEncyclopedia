const ACCESS_TOKEN_KEY = 'user'

export const getAuthCredentials = () => {
  const user = JSON.parse(
    localStorage.getItem(ACCESS_TOKEN_KEY) ?? '{ accessToken: "" }',
  )

  const accessToken = user.accessToken

  return { accessToken }
}
