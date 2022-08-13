import type { FullUserData } from '@uikit/organisms/modals/LoginModal'
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'

if (typeof window !== 'undefined') {
  var defaultValue: any = JSON.parse(
    localStorage.getItem('user') || '{ "accessToken": "" }',
  )
}

export const AuthContext = createContext<{
  user: FullUserData
  setUser: Dispatch<SetStateAction<FullUserData>> | null
}>({
  user: defaultValue,
  setUser: null,
})

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(defaultValue)

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
