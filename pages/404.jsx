import Layout from "../components/layout"
import Link from "next/link"

export default function Error() {
	return (
		<Layout title="Error">
			<div className="grid place-items-center h-[calc(100vh-64px)]">
				<span className="space-y-5">
					<h1 className="text-7xl text-center font-bold">404 Not Found</h1>
					<Link href="/">
						<a className="text-3xl text-center block hover:underline">
							Back to home
						</a>
					</Link>
				</span>
			</div>
		</Layout>
	)
}
