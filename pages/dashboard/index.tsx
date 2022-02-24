import Layout from "../../components/layout"
import { useAuth } from "../../components/userContext"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { fetchData } from "../../lib/utils"

const AccountHeader = dynamic(() => import("../../components/accountHeader"))

export default function Account() {
  const [user] = useAuth()
  const [courses, setCourses] = useState({
    cs: user.courses?.cs,
    math: user.courses?.math,
    science: user.courses?.science,
    art: user.courses?.art,
  })
  const [latest, setLatest] = useState({
    current: user.current,
    currentTitle: user.currentTitle,
  })
  useEffect(() => {
    const fn = async () => {
      try {
        const res = await fetchData(`/api/user/getuser?username=${user.uid}`, {
          method: "GET",
        })
        const data = res.data
        setCourses(data.courses)
        setLatest({
          current: data.current,
          currentTitle: data.currentTitle,
        })
      } catch {}
    }
    fn()
  }, [user.uid])
  return (
    <Layout title="Account" container={false}>
      <AccountHeader />
      <div className="mx-auto max-w-7xl py-6 px-4 text-black dark:text-white sm:px-6 lg:px-8">
        <div className="m-2 mb-10 rounded-lg border border-gray-200 bg-gradient-to-r from-gray-200 to-gray-100 p-3 shadow dark:border-other-700 dark:from-other-700 dark:to-other-800 dark:shadow-white/10">
          <h1 className="text-lg font-medium">Continue where you left off</h1>
          <Link href={latest.current || ""}>
            <a className="text-xl font-semibold hover:underline">
              {latest.currentTitle || ""}
            </a>
          </Link>
        </div>
        <h1 className="pb-5 text-center text-4xl font-semibold">Courses</h1>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href={`/lessons/science/${courses.science || "whatisbio"}`}>
            <a className="flex h-64 w-full cursor-pointer flex-col justify-center rounded-md border border-gray-200 border-opacity-50 bg-green-200 shadow-xl dark:bg-green-300 dark:shadow-white/10 sm:w-64">
              <h1 className="text-center text-3xl dark:text-black">Science</h1>
              <Image
                src="/science.svg"
                height={150}
                width={150}
                priority
                className="m-auto select-none"
                alt="Science logo"
              />
            </a>
          </Link>
          <Link href={`/lessons/cs/${courses.cs || "intro-cp"}`}>
            <a className="flex h-64 w-full cursor-pointer flex-col justify-center rounded-md border border-gray-200 border-opacity-50 bg-blue-200 shadow-xl dark:bg-blue-300 dark:shadow-white/10 sm:w-64">
              <h1 className="text-center text-3xl dark:text-black">
                Engineering
              </h1>
              <Image
                src="/cs.svg"
                height={150}
                width={150}
                className="m-auto select-none"
                alt="Engineering logo"
              />
            </a>
          </Link>
          <Link href={`/lessons/math/${courses.math || "samedenadd"}`}>
            <a className="flex h-64 w-full cursor-pointer flex-col justify-center rounded-md border border-gray-200 border-opacity-50 bg-red-200 shadow-xl dark:bg-red-300 dark:shadow-white/10 sm:w-64">
              <h1 className="text-center text-3xl dark:text-black">
                Mathematics
              </h1>
              <Image
                src="/math.svg"
                height={150}
                width={150}
                className="m-auto select-none"
                alt="Math logo"
              />
            </a>
          </Link>
          <Link href={`/lessons/art/${courses.art || "tools"}`}>
            <a className="flex h-64 w-full cursor-pointer flex-col justify-center rounded-md border border-gray-200 border-opacity-50 bg-yellow-200 shadow-xl dark:bg-yellow-300 dark:shadow-white/10 sm:w-64">
              <h1 className="text-center text-3xl dark:text-black">Art</h1>
              <Image
                src="/art.svg"
                height={150}
                width={150}
                className="m-auto select-none !p-3"
                alt="Art logo"
              />
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  )
}
