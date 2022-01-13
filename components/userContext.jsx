import { createContext, useContext, useEffect, useState } from "react"
import db, { auth } from "./clientApp"
import { doc, getDoc } from "@firebase/firestore"
import { useAuthState } from "./hooks"

const AuthContext = createContext()

export default function AuthProvider({ children }) {
    const [user, setUser] = useState({ uid: null, loading: true })
    const [u, loading, error] = useAuthState(auth)
    useEffect(async () => {
        console.log(error)
        if (!loading) {
            if (!u) {
                setUser({ uid: null, loading: false })
            } else {
                setUser(user)
                const userDb = await getDoc(doc(db, "users", u.uid))
                const userData = userDb.data()
                if (!userData) {
                    setUser({ anonymous: true, uid: u.uid, profileUrl: null })
                } else {
                    setUser({ ...userData, anonymous: false, uid: u.uid })
                }
            }
        }
    }, [u, loading])


    return (
        <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}