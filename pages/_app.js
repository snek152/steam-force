import '../styles/globals.css'
import { useEffect } from 'react'
import db, { auth } from '../components/clientApp'
import { onAuthStateChanged } from '@firebase/auth'
import nookies from "nookies"
import { doc, getDoc } from '@firebase/firestore'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        let uid = await getDoc(doc(db, "users", user.uid))
        nookies.set(undefined, "uid", JSON.stringify(uid.data()), { path: "/" })
        nookies.set(undefined, "logged_in", true, { path: "/" })
      } else {
        nookies.set(undefined, "uid", "", { path: "/" })
        nookies.set(undefined, "logged_in", false, { path: "/" })
      }
    })
  })
  return <Component {...pageProps} />
}

export default MyApp
