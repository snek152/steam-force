import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "./clientApp"
import { useAuthState } from "react-firebase-hooks/auth"

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

export default function AuthProvider({ children }) {
  const [user, setUser] = useState<User>({ uid: null, loading: true })
  const [u, loading, error] = useAuthState(auth)
  useEffect(() => {
    const fn = async () => {
      if (!loading) {
        if (!u) {
          setUser({ uid: null, loading: false })
        } else {
          setUser((u) => u)
          const userDb = await fetch(
            `${
              process.env.NODE_ENV === "development"
                ? "http://localhost:3000"
                : "https://steam-force.vercel.app"
            }/api/user/getuser?username=${u.uid}`,
            {
              method: "GET",
            },
          )
          const userData = await userDb.json()
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
  }, [u, loading, error])

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export const useAuth = (): User => {
  return useContext(AuthContext)
}
