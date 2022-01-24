import "../styles/globals.scss"
import "../styles/atom-one-dark.css"
import AuthProvider from "../components/userContext"

function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<Component {...pageProps} />
		</AuthProvider>
	)
}

export default MyApp
