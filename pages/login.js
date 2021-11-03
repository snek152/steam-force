import { useRef, useState } from "react"
import Layout from "../components/layout"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../components/clientApp"
import Router from "next/router"

export default function Login() {
    const email = useRef(null)
    const password = useRef(null)
    const formSubmit = (event) => {
        event.preventDefault()
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                setError(null)
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
            <div>Sign in</div>
            <form onSubmit={() => formSubmit(event)}>
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
