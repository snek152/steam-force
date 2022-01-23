import Layout from "../components/layout"

export default function Offline() {
    return <Layout title="Offline">
        <div className="grid place-items-center h-[calc(100vh-64px)]">
            <span className="space-y-5">
                <h1 className="text-7xl text-center font-bold">You are offline.</h1>
                <p className="text-3xl text-center">Please reconnect to the Internet to regain access to the app.</p>
            </span>
        </div>
    </Layout>
}