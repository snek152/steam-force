import Layout from "../components/layout"
import Link from "next/link"

export default function Error() {
  return (
    <Layout title="Error">
      <div className="grid h-[calc(100vh-64px)] place-items-center">
        <span className="space-y-5">
          <h1 className="text-center text-7xl font-bold">404 Not Found</h1>
          <Link href="/">
            <a className="block text-center text-3xl hover:underline">
              Back to home
            </a>
          </Link>
        </span>
      </div>
    </Layout>
  )
}
