import nookies from "nookies"
import app from "../../components/admin"
import Layout from "../../components/layout"
export default function Account({ user }) {
    return (
        <Layout title="Account">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Account
                        Welcome {user.username}
                    </h1>
                </div>
            </header>
        </Layout>
    )
}

export async function getServerSideProps(ctx) {
    try {
        const cookies = nookies.get(ctx)
        const token = await app.auth().verifyIdToken(cookies.token)
        const { uid, email } = token
        if (!email) return { redirect: { permanent: false, destination: "/login" } }
        const userDb = await app.firestore().collection("users").doc(uid).get()
        return {
            props: {
                user: userDb.data()
            }
        }
    }
    catch (err) {
        return {
            redirect: {
                permanent: false,
                destination: "/login"
            }
        }
    }
}