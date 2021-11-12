import { createContext, useContext, useEffect, useState } from "react"
import nookies from "nookies"
import db, { auth } from "./clientApp"
import { doc, getDoc } from "@firebase/firestore"

const AuthContext = createContext()

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        return auth.onIdTokenChanged(async (user) => {
            if (!user) {
                setUser(null)
                nookies.set(undefined, "token", "", { path: "/" })
            } else {
                const userDb = await getDoc(doc(db, "users", user.uid))
                const userData = userDb.data()
                if (!userData) {
                    nookies.set(undefined, "anonymous", true, { path: "/" })
                    setUser({ anonymous: true, uid: user.uid })
                    const token = await user.getIdToken()
                    nookies.set(undefined, "token", token, { path: "/" })
                } else {
                    nookies.set(undefined, "anonymous", false, { path: "/" })
                    setUser(userData)
                    const token = await user.getIdToken()
                    nookies.set(undefined, "token", token, { path: "/" })
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