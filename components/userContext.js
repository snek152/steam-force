import { createContext, useContext, useEffect, useState } from "react"
import db, { auth } from "./clientApp"
import { doc, getDoc } from "@firebase/firestore"

const AuthContext = createContext()

export default function AuthProvider({ children }) {
    const [user, setUser] = useState({ uid: null, loading: true })

    useEffect(() => {
        return auth.onAuthStateChanged(async (user) => {
            if (!user) {
                setUser({ uid: null, loading: false })
            } else {
                const userDb = await getDoc(doc(db, "users", user.uid))
                const userData = userDb.data()
                if (!userData) {
                    setUser({ anonymous: true, uid: user.uid, profileUrl: null })
                } else {
                    setUser({ ...userData, anonymous: false, uid: user.uid })
                }
            }
        })
    }, [])

    return (
        <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}