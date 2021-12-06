import Layout from "../components/layout"
import Image from "next/image"

export default function Home() {
    return (
        <Layout title="Home">
            <div className="relative h-[calc(100vh-64px)] w-full">
                <Image layout="fill" src="/home.png" priority quality="85" className="object-cover bg-center" />
            </div>
        </Layout>
    )
}
