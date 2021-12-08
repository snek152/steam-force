import Layout from "../components/layout"
import Image from "next/image"

export default function Home() {
    return (
        <Layout title="Home">
            <div className="relative flex h-[calc(100vh-64px)] w-full items-center">
                <div className="relative z-[100] p-8 flex-grow bg-white bg-opacity-70">
                    <h1 className="text-center text-5xl text-black">The Steam Force</h1>
                    <hr className="bg-black border-none h-[0.1rem] rounded-xl bg-opacity-50 m-2" />
                    <h2 className="text-center text-xl text-blue">An open source initiative for interactive and sustainable education</h2>
                </div>
                <div>
                    <Image layout="fill" src="/home.png" priority quality="85" className="object-cover bg-center absolute z-50" />
                </div>
            </div>
        </Layout>
    )
}
