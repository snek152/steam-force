import { createContext, useContext, useEffect, useState } from "react"
import db, { auth } from "./clientApp"
import { doc, getDoc } from "@firebase/firestore"
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
          try {
            const userDb = await getDoc(doc(db, "users", u.uid))
            const userData = userDb.data()
            if (!userData) {
              setUser({ anonymous: true, uid: u.uid, profileUrl: null })
            } else {
              setUser({ ...userData, anonymous: false, uid: u.uid })
            }
          } catch {
            setUser({ uid: null, offline: true })
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
