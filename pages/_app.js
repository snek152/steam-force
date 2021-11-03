import '../styles/globals.css'
import { useEffect } from 'react'
import { auth } from '../components/clientApp'
import { onAuthStateChanged } from '@firebase/auth'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("logged in")
      } else {
        console.log("Not logged in")
      }
    })
  })
  return <Component {...pageProps} />
}

export default MyApp
