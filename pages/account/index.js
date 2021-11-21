import Layout from "../../components/layout"
import { useAuth } from "../../components/userContext"
export default function Account() {
    const user = useAuth()
    return (
        <Layout title="Account" container={false}>
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
