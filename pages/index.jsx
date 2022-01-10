import Layout from "../components/layout"
import Image from "next/image"
import home from "../public/home.png"

export default function Home() {
    return (
        <Layout title="Home">
            <div className="relative h-[calc(100vh-64px)] w-full bg-white bg-opacity-70">
                <div className="bg-white relative bg-opacity-50 h-full items-center z-[200] flex">
                    <div className="relative z-[120] p-8 flex-grow overflow-hidden">
                        <h1 className="text-center text-5xl text-black font-semibold">The Steam Force</h1>
                        <hr className="bg-black max-w-full border-none h-[0.1rem] rounded-xl bg-opacity-50 m-2 w-[30rem] mx-auto" />
                        <h2 className="text-center text-xl text-blue-600">An open source initiative for interactive and sustainable education</h2>
                    </div>
                </div>
                <div className="z-50">
                    <Image alt="Homepage image" layout="fill" src={home} loading="lazy" quality="85" className="object-cover bg-center absolute z-50" />
                </div>
            </div>
        </Layout>
    )
}
