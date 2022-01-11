import Layout from "../../components/layout"
import { useAuth } from "../../components/userContext"
import Image from "next/image"
import Link from "next/link"
import AccountHeader from "../../components/accountHeader"
import { doc, getDoc } from "@firebase/firestore"
import { useEffect, useState } from "react"
import db from "../../components/clientApp"


export default function Account() {
    const user = useAuth()
    const [courses, setCourses] = useState({
        cs: null,
        math: null,
        science: null
    })

    const [latest, setLatest] = useState({
        current: "",
        currentTitle: ""
    })
    useEffect(() => {
        const fn = async () => {
            try {
                const data = await getDoc(doc(db, "users", user.uid))
                setCourses(data.data().courses)
                setLatest({
                    current: data.data().current,
                    currentTitle: data.data().currentTitle
                })
            } catch { }
            // try { await auth.currentUser.getIdToken(true) }
            // catch { }
            // if (user.courses) {
            //     if (user.courses.cs == null) {
            //         await updateDoc(doc(db, "users", user.uid), {
            //             courses: {
            //                 cs: "intro-cp"
            //             }
            //         })
            //     }
            // }
        }
        fn()
    }, [user])
    return (
        <Layout title="Account" container={false}>
            <AccountHeader />
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-gray-200 to-gray-100 border border-gray-200 shadow rounded-lg p-3 m-2 mb-10">
                    <h1 className="font-medium text-lg">Continue where you left off</h1>
                    <Link href={latest.current ? latest.current : ""}>
                        <a className="font-semibold text-xl hover:underline">
                            {latest.currentTitle ? latest.currentTitle : ""}
                        </a>
                    </Link>
                </div>
                <h1 className="font-semibold text-center text-4xl pb-5">Courses</h1>
                <div className="flex items-center justify-center gap-4">
                    <div className="border border-gray-200 border-opacity-50 h-64 w-64 rounded-md bg-green-200 shadow-xl flex flex-col justify-center cursor-pointer">
                        <h1 className="text-3xl text-center">Science</h1>
                        <Image src="/science.svg" height={150} width={150} priority className="m-auto select-none" />
                    </div>
                    <Link href={`/lessons/cs/${courses.cs ? courses.cs : "intro-cp"}`}>
                        <div className="border border-gray-200 border-opacity-50 h-64 w-64 rounded-md bg-blue-200 shadow-xl flex flex-col justify-center cursor-pointer">
                            <h1 className="text-3xl text-center">Engineering</h1>
                            <Image src="/cs.svg" height={150} width={150} className="m-auto select-none" />
                        </div>
                    </Link>
                    <div className="border border-gray-200 border-opacity-50 h-64 w-64 rounded-md bg-red-200 shadow-xl flex flex-col justify-center cursor-pointer">
                        <h1 className="text-3xl text-center">Mathematics</h1>
                        <Image src="/math.svg" height={150} width={150} className="m-auto select-none" />
                    </div>
                </div>
            </div>

        </Layout>
    )
}
