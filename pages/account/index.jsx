import Layout from "../../components/layout"
import { useAuth } from "../../components/userContext"
import Image from "next/image"

export default function Account() {
    const user = useAuth()
    return (
        <Layout title="Account" container={false}>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Account page
                        Welcome {user.username}
                    </h1>
                </div>
            </header>
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="font-semibold text-center text-4xl pb-5">Courses</h1>
                <div className="flex items-center justify-center gap-4">
                    <div className="border border-gray-200 border-opacity-50 h-64 w-64 rounded-md bg-green-200 shadow-xl flex flex-col justify-center cursor-pointer">
                        <h1 className="text-3xl text-center">Science</h1>
                        <Image src="/science.svg" height={150} width={150} className="m-auto select-none" />
                    </div>
                    <div className="border border-gray-200 border-opacity-50 h-64 w-64 rounded-md bg-blue-200 shadow-xl flex flex-col justify-center cursor-pointer">
                        <h1 className="text-3xl text-center">Engineering</h1>
                        <Image src="/cs.svg" height={150} width={150} className="m-auto select-none" />
                    </div>
                    <div className="border border-gray-200 border-opacity-50 h-64 w-64 rounded-md bg-red-200 shadow-xl flex flex-col justify-center cursor-pointer">
                        <h1 className="text-3xl text-center">Mathematics</h1>
                        <Image src="/math.svg" height={150} width={150} className="m-auto select-none" />
                    </div>
                </div>
            </div>

        </Layout>
    )
}
