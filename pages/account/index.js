import nookies from "nookies"
import { useState } from "react"
import { signOut } from "@firebase/auth"
import { auth } from "../../components/clientApp"
import Router from "next/router"
import app from "../../components/admin"
import Layout from "../../components/layout"
export default function Account({ user }) {
    const [e, setError] = useState(null)
    const formSubmit = () => {
        signOut(auth)
            .then(() => {
                setError(null)
                Router.push("/")
            })
            .catch((error) => {
                let code = error.code.substring(5).replace(/-/g, ' ')
                code = code.charAt(0).toUpperCase() + code.slice(1)
                setError(code)
            })
    }
    return (
        <Layout title="Account">
            <h1>Account page</h1>
            <p>Hello {user.username}</p>
            <button onClick={formSubmit}>Sign out</button>
            <p style={{ color: "red" }}>{e}</p>
        </Layout>
    )
}

export async function getServerSideProps(ctx) {
    try {
        const cookies = nookies.get(ctx)
        const token = await app.auth().verifyIdToken(cookies.token)
        const { uid, email } = token
        if (!email) return { redirect: { permanent: false, destination: "/login" } }
        const userDb = await app.firestore().collection("users").doc(uid).get()
        return {
            props: {
                user: userDb.data()
            }
        }
    }
    catch (err) {
        return {
            redirect: {
                permanent: false,
                destination: "/login"
            }
        }
    }
}