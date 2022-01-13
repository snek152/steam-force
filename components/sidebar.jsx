import { useAuth } from "./userContext"
import { Disclosure, Transition } from "@headlessui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import $ from "jquery"

const units = {
    cs: {
        cp: "Computer Programming",
        cs: "Computer Science"
    }
}

export default function Sidebar({ lessons, type }) {
    const user = useAuth()
    const router = useRouter()
    useEffect(() => {
        if (router.pathname.includes("science")) {
            $(".science").trigger("click")
        }
        if (router.pathname.includes("cs")) {
            $(".cs").trigger("click")
        }
        if (router.pathname.includes("math")) {
            $(".math").trigger("click")
        }
    }, [router.pathname])
    return <div className="w-full sm:w-3/12 inline-block relative">
        <div className="sticky sm:top-[88px] top-0 p-2">
            <h1 className="font-semibold text-center text-lg">Courses</h1>
            <p className="text-center">Points: <strong>{user.points}</strong></p>
            <div className="max-w-md py-2 mr-2 rounded-2xl">
                <Disclosure>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="science my-2 flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-black bg-green-100 rounded-lg hover:bg-green-200 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75">
                                <span>
                                    <img src="/science.svg" className="h-4 w-4 align-text-bottom p-[1px] inline-block" alt="Science logo" />
                                    <h1 className="inline-block">Science</h1>
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`${open ? 'transform rotate-180' : ''} w-5 h-5 inline-block`} viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                            </Disclosure.Button>
                            <Transition
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                            >
                                <Disclosure.Panel className="px-4 pt-1 pb-1 text-sm text-gray-600 relative">
                                    <ul className="list-outside text-left ml-4">
                                        {lessons.science.map(lesson => (
                                            <li key={lesson.slug} className={`p-1 hover:underline ${router.query.slug == lesson.slug && "font-bold"}`}>
                                                <Link href={`/lessons/${type}/${lesson.slug}`}>
                                                    <a>
                                                        {lesson.title}
                                                    </a>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </Disclosure.Panel>
                            </Transition>
                        </>
                    )}
                </Disclosure>
                <Disclosure>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="cs my-2 flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-black bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                                <span>
                                    <img src="/cs.svg" className="h-4 w-4 align-text-bottom p-[1px] inline-block" alt="Engineering logo" />
                                    <h1 className="inline-block">Engineering</h1>
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`${open ? 'transform rotate-180' : ''} w-5 h-5 inline-block`} viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                            </Disclosure.Button>
                            <Transition
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                            >
                                <Disclosure.Panel className="px-4 pt-1 pb-1 text-sm text-gray-600 relative">
                                    {Object.keys(units.cs).map(key => (
                                        <Disclosure key={key}>
                                            <Disclosure.Button className="rounded-lg border w-full border-gray-200 p-1 mb-2 bg-gray-200">
                                                <h1 className="text-sm inline-block">{units.cs[key]}</h1>
                                                <svg xmlns="http://www.w3.org/2000/svg" className={`${open ? 'transform rotate-180' : ''} w-5 h-5 inline-block`} viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                                </svg>
                                            </Disclosure.Button>
                                            <Transition
                                                enter="transition duration-100 ease-out"
                                                enterFrom="transform scale-95 opacity-0"
                                                enterTo="transform scale-100 opacity-100"
                                                leave="transition duration-75 ease-out"
                                                leaveFrom="transform scale-100 opacity-100"
                                                leaveTo="transform scale-95 opacity-0"
                                            >
                                                <Disclosure.Panel>
                                                    <ul className="list-outside text-left ml-4 mb-2 ">
                                                        {lessons.cs.map(lesson => lesson.unit == units.cs[key] && (
                                                            <li key={lesson.slug} className={`p-1 text-sm hover:underline ${router.query.slug == lesson.slug && "font-bold"}`}>
                                                                <Link href={`/lessons/${type}/${lesson.slug}`}>
                                                                    <a>
                                                                        {lesson.title}
                                                                    </a>
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </Disclosure.Panel>
                                            </Transition>
                                        </Disclosure>
                                    ))}

                                </Disclosure.Panel>
                            </Transition>
                        </>
                    )}
                </Disclosure>
                <Disclosure>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="math my-2 flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-black bg-red-100 rounded-lg hover:bg-red-200 focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75">
                                <span>
                                    <img src="/math.svg" className="h-4 w-4 align-text-bottom p-[1px] inline-block" alt="Math logo" />
                                    <h1 className="inline-block">Math</h1>
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`${open ? 'transform rotate-180' : ''} w-5 h-5 inline-block`} viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                            </Disclosure.Button>
                            <Transition
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                            >
                                <Disclosure.Panel className="px-4 pt-1 pb-1 text-sm text-gray-600 relative">
                                    <ul className="list-outside text-left ml-4 ">
                                        {lessons.math.map(lesson => (
                                            <li key={lesson.slug} className={`p-1 hover:underline ${router.query.slug == lesson.slug && "font-bold"}`}>
                                                <Link href={`/lessons/${type}/${lesson.slug}`}>
                                                    <a>
                                                        {lesson.title}
                                                    </a>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </Disclosure.Panel>
                            </Transition>
                        </>
                    )}
                </Disclosure>
            </div>
        </div>
    </div>
}