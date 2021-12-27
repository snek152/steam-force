import { useRef, useState } from "react"
import Layout from "../components/layout"
import { createUserWithEmailAndPassword } from "firebase/auth"
import db, { auth } from "../components/clientApp"
import { collection, doc, getDocs, query, setDoc, where } from "@firebase/firestore"
import Router from "next/router"
import nookies from "nookies"
import Link from "next/link"


export default function Signup() {
    const email = useRef(null)
    const password = useRef(null)
    const username = useRef(null)
    const formSubmit = async (event) => {
        event.preventDefault()
        const usernameData = await getDocs(query(collection(db, "users"), where("username", "==", username.current.value)))
        if (!usernameData.empty) {
            setError("Username already exists")
        } else {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then(async (userCredential) => {
                    setError(null)
                    await setDoc(doc(db, "users", userCredential.user.uid), {
                        username: username.current.value,
                        profileUrl: null,
                        courses: {
                            math: null,
                            science: null,
                            cs: null
                        },
                        points: 0,
                        current: null
                    })
                    Router.push("/account")
                })
                .catch((error) => {
                    let code = error.code.substring(5).replace(/-/g, ' ')
                    code = code.charAt(0).toUpperCase() + code.slice(1)
                    setError(code)
                })
        }

    }
    const [e, setError] = useState(null)
    return (
        <Layout title="Signup">
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Sign up for an account
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Already have an account?&nbsp;
                            <Link href="/login">
                                <a className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Log in&nbsp;
                                </a>
                            </Link>
                            or&nbsp;
                            <Link href="/trial">
                                <a className="font-medium text-indigo-600 hover:text-indigo-500">
                                    start your free trial
                                </a>
                            </Link>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={(event) => formSubmit(event)}>
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="username" className="sr-only">Username</label>
                                <input ref={username} id="username" name="username" type="text" autoComplete="nickname" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" />
                            </div>
                            <div>
                                <label htmlFor="email-address" className="sr-only">Email address</label>
                                <input ref={email} id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input ref={password} id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <p className="text-red-500 font-medium">{e}</p>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )

}