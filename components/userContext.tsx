import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "./clientApp"
import { useAuthState } from "react-firebase-hooks/auth"
import { fetchData } from "./utils"

const AuthContext = createContext(null)

type User = {
  uid: null | string
  loading?: boolean
  offline?: boolean
  anonymous?: boolean
  profileUrl?: null | string
  current?: string
  username?: string
  points?: number
  currentTitle?: string
  courses?: UserCourse
  completed?: string[]
}

type UserCourse = {
  cs: string | null
  math: string | null
  science: string | null
}
const defaultUser: User = {
  uid: null,
  loading: true,
  offline: false,
  anonymous: false,
  profileUrl: null,
  current: "",
  username: "",
  points: 0,
  currentTitle: "",
  courses: { cs: null, math: null, science: null },
  completed: [],
}
export default function AuthProvider({ children }) {
  const [user, setUser] = useState<User>(defaultUser)
  const [u, loading, error] = useAuthState(auth)
  const [dval, setDval] = useState("")
  const dispatch = () => {
    setDval((v) => v + " ")
  }
  useEffect(() => {
    const fn = async () => {
      if (!loading) {
        if (!u) {
          if (!window.navigator.onLine) {
            setUser({ uid: null, offline: true })
          } else {
            setUser({ uid: null, loading: false })
          }
        } else {
          setUser((u) => u)
          const userData = await fetchData(
            `/api/user/getuser?username=${u.uid}`,
            { method: "GET" },
          )
          if (userData.error == 1) {
            setUser({ uid: null, offline: true })
          } else {
            const myData = userData.data
            if (!userData) {
              setUser({ anonymous: true, uid: u.uid, profileUrl: null })
            } else {
              setUser({ ...myData, anonymous: false, uid: u.uid })
            }
          }
        }
      }
    }
    fn()
    return () => setDval("")
  }, [u, loading, error, dval])

  return (
    <AuthContext.Provider value={[user, dispatch]}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): [User, () => void] => {
  return useContext(AuthContext)
}
