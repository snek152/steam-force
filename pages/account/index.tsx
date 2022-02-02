/* eslint-disable @next/next/link-passhref */
import Layout from "../../components/layout"
import { useAuth } from "../../components/userContext"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

const AccountHeader = dynamic(() => import("../../components/accountHeader"))

export default function Account() {
  const [user] = useAuth()
  const [courses, setCourses] = useState({
    cs: user.courses?.cs,
    math: user.courses?.math,
    science: user.courses?.science,
  })

  const [latest, setLatest] = useState({
    current: user.current,
    currentTitle: user.currentTitle,
  })
  useEffect(() => {
    const fn = async () => {
      try {
        const res = await fetch(
          `${
            process.env.NODE_ENV === "development"
              ? "http://localhost:3000"
              : "https://steam-force.vercel.app"
          }/api/user/getuser?username=${user.uid}`,
          {
            method: "GET",
          },
        )
        const data = (await res.json()).data
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
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-black dark:text-white">
        <div className="bg-gradient-to-r from-gray-200 dark:from-other-700 to-gray-100 dark:to-other-800 border border-gray-200 dark:border-other-700 shadow dark:shadow-white/10 rounded-lg p-3 m-2 mb-10">
          <h1 className="font-medium text-lg">Continue where you left off</h1>
          <Link href={latest.current ? latest.current : ""}>
            <a className="font-semibold text-xl hover:underline">
              {latest.currentTitle ? latest.currentTitle : ""}
            </a>
          </Link>
        </div>
        <h1 className="font-semibold text-center text-4xl pb-5">Courses</h1>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="sm:w-64 border border-gray-200 border-opacity-50 h-64 w-full rounded-md bg-green-200 dark:bg-green-300 shadow-xl dark:shadow-white/10 flex flex-col justify-center cursor-pointer">
            <h1 className="text-3xl text-center dark:text-black">Science</h1>
            <Image
              src="/science.svg"
              height={150}
              width={150}
              priority
              className="m-auto select-none"
              alt="Science logo"
            />
          </div>
          <Link href={`/lessons/cs/${courses.cs ? courses.cs : "intro-cp"}`}>
            <a className="sm:w-64 border border-gray-200 border-opacity-50 h-64 w-full rounded-md bg-blue-200 dark:bg-blue-300 shadow-xl dark:shadow-white/10 flex flex-col justify-center cursor-pointer">
              <h1 className="text-3xl text-center dark:text-black">
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
          <div className="sm:w-64 border border-gray-200 border-opacity-50 h-64 w-full rounded-md bg-red-200 dark:bg-red-300 shadow-xl dark:shadow-white/10 flex flex-col justify-center cursor-pointer">
            <h1 className="text-3xl text-center dark:text-black">
              Mathematics
            </h1>
            <Image
              src="/math.svg"
              height={150}
              width={150}
              className="m-auto select-none"
              alt="Math logo"
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}
