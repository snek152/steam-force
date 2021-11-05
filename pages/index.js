import Layout from "../components/layout"
import nookies from "nookies"

export default function Home({ uid }) {
    return (
        <Layout title="Home">
            <div>Hello there.</div>
            {uid ? <div>Hello {uid.username}</div> : <div>No user logged in</div>}
        </Layout>
    )
}

export async function getServerSideProps(ctx) {
    if (eval(nookies.get(ctx).logged_in)) {
        return {
            props: {
                uid: JSON.parse(nookies.get(ctx).uid)
            }
        }
    }

    return {
        props: {
            uid: null
        }
    }
}