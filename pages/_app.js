import '../styles/globals.css'
import { useEffect } from 'react'
import db, { auth } from '../components/clientApp'
import { onAuthStateChanged } from '@firebase/auth'
import nookies from "nookies"
import { doc, getDoc } from '@firebase/firestore'
import AuthProvider from '../components/userContext'

function MyApp({ Component, pageProps }) {
  return <AuthProvider><Component {...pageProps} /></AuthProvider>
}

export default MyApp
