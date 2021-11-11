import Layout from "../components/layout"
import { useAuth } from "../components/userContext"

export default function Home() {
    const uid = useAuth()
    return (
        <Layout title="Home">
            <div>Hello there.</div>
            {uid ? <div>Hello {uid.username}</div> : <div>No user logged in</div>}
        </Layout>
    )
}
