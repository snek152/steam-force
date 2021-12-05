import Layout from "../components/layout"
import Image from "next/image"

export default function Home() {
    return (
        <Layout title="Home" noNav>
            <Image height={1016} width={1920} src="/home.png" priority />
        </Layout>
    )
}
