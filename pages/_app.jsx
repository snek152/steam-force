import '../styles/globals.scss'
import "highlight.js/styles/atom-one-dark.css"
import AuthProvider from '../components/userContext'
import { useEffect } from 'react'
import hljs from 'highlight.js'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    hljs.highlightAll()
  }, [])
  return <AuthProvider><Component {...pageProps} /></AuthProvider>
}

export default MyApp
