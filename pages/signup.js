import { useRef, useState } from "react"
import Layout from "../components/layout"
import { createUserWithEmailAndPassword } from "firebase/auth"
import db, { auth } from "../components/clientApp"
import { doc, setDoc } from "@firebase/firestore"
import Router from "next/router"
import nookies from "nookies"

export default function Signup() {
    const email = useRef(null)
    const password = useRef(null)
    const username = useRef(null)
    const formSubmit = (event) => {
        event.preventDefault()
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then(async (userCredential) => {
                setError(null)
                await setDoc(doc(db, "users", userCredential.user.uid), {
                    username: username.current.value
                })
                Router.push("/account")
            })
            .catch((error) => {
                let code = error.code.substring(5).replace(/-/g, ' ')
                code = code.charAt(0).toUpperCase() + code.slice(1)
                setError(code)
            })
    }
    const [e, setError] = useState(null)
    return (
        <Layout title="Signup">
            <div>Sign up</div>
            <form onSubmit={(event) => formSubmit(event)}>
                <input ref={username} placeholder="Username" type="text" />
                <br />
                <input ref={email} placeholder="Email" type="text" />
                <br />
                <input ref={password} placeholder="Password" type="password" />
                <br />
                <button type="submit">Submit</button>
                <p style={{ color: "red" }}>
                    {e}
                </p>
            </form>
        </Layout>
    )

}

export async function getServerSideProps(ctx) {
    if (nookies.get(ctx).token != "" && !eval(nookies.get(ctx).anonymous)) {
        return {
            redirect: {
                permanent: false,
                destination: "/account"
            }
        }
    }

    return {
        props: {

        }
    }
}