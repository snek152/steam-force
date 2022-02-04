import Layout from "../components/layout"

export default function Offline() {
  return (
    <Layout title="Offline">
      <div className="grid h-[calc(100vh-64px)] place-items-center">
        <span className="space-y-5">
          <h1 className="text-center text-7xl font-bold">You are offline.</h1>
          <p className="text-center text-3xl">
            Please reconnect to the Internet to regain access to the app.
          </p>
        </span>
      </div>
    </Layout>
  )
}
