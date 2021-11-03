import '../styles/globals.css'
import { useEffect } from 'react'
import { auth } from '../components/clientApp'
import { onAuthStateChanged } from '@firebase/auth'
import nookies from "nookies"

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        nookies.set(undefined, "uid", user.uid, { path: "/" })
      } else {
        nookies.set(undefined, "uid", "", { path: "/" })
      }
    })
  })
  return <Component {...pageProps} />
}

export default MyApp
