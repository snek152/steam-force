import { useState } from "react"
import { signOut } from "@firebase/auth"
import { auth } from "../components/clientApp"
import Router from "next/router"
import Layout from "../components/layout"
import { useAuth } from "../components/userContext"
export default function Account() {
    const user = useAuth()
    const [e, setError] = useState(null)
    const formSubmit = () => {
        signOut(auth)
            .then(() => {
                setError(null)
                Router.push("/signup")
            })
            .catch((error) => {
                let code = error.code.substring(5).replace(/-/g, ' ')
                code = code.charAt(0).toUpperCase() + code.slice(1)
                setError(code)
            })
    }
    return (
        <Layout title="Free Trial">
            <h1>Free Trial</h1>
            <p>Hello! Continue free trial below</p>
            <button onClick={formSubmit}>Create Account</button>
            <p style={{ color: "red" }}>{e}</p>
        </Layout>
    )
}