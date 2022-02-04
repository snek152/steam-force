import Layout from "../components/layout"
import Image from "next/image"

export default function Home() {
  return (
    <Layout title="Home">
      <div className="relative h-[calc(100vh-64px)] w-full bg-white bg-opacity-70">
        <div className="relative z-[200] flex h-full items-center bg-white bg-opacity-50">
          <div className="relative z-[120] flex-grow overflow-hidden p-8">
            <h1 className="text-center text-5xl font-semibold text-black">
              The Steam Force
            </h1>
            <hr className="m-2 mx-auto h-[0.1rem] w-[30rem] max-w-full rounded-xl border-none bg-black bg-opacity-50" />
            <h2 className="text-center text-xl text-blue-600">
              An open source initiative for interactive and sustainable
              education
            </h2>
          </div>
        </div>
        <div className="z-50">
          <Image
            alt="Homepage image"
            layout="fill"
            src="/home.png"
            loading="lazy"
            quality="85"
            className="absolute z-50 bg-center object-cover"
          />
        </div>
      </div>
    </Layout>
  )
}
