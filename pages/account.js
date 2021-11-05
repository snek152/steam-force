import nookies from "nookies"
import { useState } from "react"
import { signOut } from "@firebase/auth"
import { auth } from "../components/clientApp"
import Router from "next/router"
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
        <>
            <h1>Account page</h1>
            <p>Hello {user.username}</p>
            <button onClick={formSubmit}>Sign out</button>
            <p style={{ color: "red" }}>{e}</p>
        </>
    )
}

export async function getServerSideProps(ctx) {
    const uid = nookies.get(ctx, "uid").uid
    if (!nookies.get(ctx, "logged_in").logged_in) {
        return {
            redirect: {
                permanent: false,
                destination: "/login"
            }
        }
    }
    return {
        props: {
            user: JSON.parse(uid)
        }
    }
}