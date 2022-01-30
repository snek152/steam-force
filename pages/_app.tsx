import "../styles/globals.scss"
import "../styles/atom-one-dark.css"
import AuthProvider from "../components/userContext"
import { ThemeProvider } from "next-themes"
import { AppProps } from "next/app"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default MyApp
