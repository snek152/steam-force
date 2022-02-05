/* eslint-disable @next/next/no-img-element */
import { useAuth } from "./userContext"
import { Dialog, Disclosure, Transition } from "@headlessui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { FormEvent, Fragment, useEffect, useRef, useState } from "react"
import Sticky from "react-stickynode"
import InputField from "./inputField"
import { auth } from "../lib/clientApp"
import { fetchData } from "../lib/utils"
const units = {
  cs: {
    cp: "Computer Programming",
    cs: "Computer Science",
  },
}

interface SidebarProps {
  lessons: {
    cs: { title: string; lesson: string; slug: string; unit: string }[]
    math: { title: string; lesson: string; slug: string; unit: string }[]
    science: { title: string; lesson: string; slug: string; unit: string }[]
  }
  type: string
  currentTitle: string
}
export default function Sidebar(props: SidebarProps) {
  const [user] = useAuth()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [width, setWidth] = useState(0)
  const science = useRef<HTMLButtonElement>(null)
  const cs = useRef<HTMLButtonElement>(null)
  const math = useRef<HTMLButtonElement>(null)
  const openModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }
  useEffect(() => {
    if (router.pathname.includes("science")) {
      science.current.click()
    }
    if (router.pathname.includes("cs")) {
      cs.current.click()
    }
    if (router.pathname.includes("math")) {
      math.current.click()
    }
  }, [router.pathname])
  useEffect(() => {
    setWidth(window.screen.width)
    window.addEventListener("resize", () => {
      setWidth(window.screen.width)
    })
    return () => {
      window.removeEventListener("resize", () => {
        setWidth(window.screen.width)
      })
    }
  }, [])
  const title = useRef(null)
  const desc = useRef(null)
  const formSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await fetchData("/api/feedback", {
      method: "POST",
      body: JSON.stringify({
        title: title.current.value,
        body: desc.current.value,
        email: auth.currentUser.email,
        lesson: props.currentTitle,
      }),
    })
  }
  return (
    <div className="relative inline-block w-full sm:w-3/12">
      <Sticky top={88} enabled={width > 640}>
        <div className="p-2">
          <h1 className="text-center text-lg font-semibold">Courses</h1>
          <p className="text-center">
            Points:{" "}
            {user.offline ? (
              <strong>not available</strong>
            ) : (
              <strong>{user.points}</strong>
            )}
          </p>
          <div className="mr-2 rounded-2xl py-2 sm:max-w-md">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    ref={science}
                    className="my-2 flex w-full justify-between rounded-lg bg-green-100 px-4 py-2 text-left text-sm font-medium text-black hover:bg-green-200 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75 dark:bg-green-300 dark:hover:bg-green-400"
                  >
                    <span>
                      <img
                        src="/science.svg"
                        className="inline-block h-4 w-4 p-[1px] align-text-bottom"
                        alt="Science logo"
                      />
                      <h1 className="inline-block">Science</h1>
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } inline-block h-5 w-5`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      />
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
                    <Disclosure.Panel className="relative px-4 pt-1 pb-1 text-sm text-gray-600">
                      <ul className="ml-4 list-outside text-left">
                        {props.lessons.science.map((lesson) => (
                          <li
                            key={lesson.slug}
                            className={`p-1 ${
                              router.query.slug == lesson.slug && "font-bold"
                            }`}
                          >
                            <Link
                              href={`/lessons/${props.type}/${lesson.slug}`}
                            >
                              <a>{lesson.title}</a>
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
                  <Disclosure.Button
                    ref={cs}
                    className="my-2 flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-black hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75 dark:bg-blue-300 dark:hover:bg-blue-400"
                  >
                    <span>
                      <img
                        src="/cs.svg"
                        className="inline-block h-4 w-4 p-[1px] align-text-bottom"
                        alt="Engineering logo"
                      />
                      <h1 className="inline-block">Engineering</h1>
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } inline-block h-5 w-5`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      />
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
                    <Disclosure.Panel className="relative px-4 pt-1 pb-1 text-sm text-gray-600">
                      {Object.keys(units.cs).map((key) => (
                        <Disclosure key={key}>
                          <Disclosure.Button className="mb-2 w-full rounded-lg border border-gray-200 bg-gray-200 p-1 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                            <h1 className="inline-block text-sm">
                              {units.cs[key]}
                            </h1>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={`${
                                open ? "rotate-180 transform" : ""
                              } inline-block h-5 w-5`}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                clipRule="evenodd"
                              />
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
                              <ul className="ml-4 mb-2 list-outside text-left ">
                                {props.lessons.cs.map(
                                  (lesson) =>
                                    lesson.unit == units.cs[key] && (
                                      <li
                                        key={lesson.slug}
                                        className={`p-1 text-sm dark:text-white ${
                                          router.query.slug == lesson.slug &&
                                          "font-bold"
                                        }`}
                                      >
                                        <Link
                                          href={`/lessons/${props.type}/${lesson.slug}`}
                                        >
                                          <a>{lesson.title}</a>
                                        </Link>
                                      </li>
                                    ),
                                )}
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
                  <Disclosure.Button
                    ref={math}
                    className="my-2 flex w-full justify-between rounded-lg bg-red-100 px-4 py-2 text-left text-sm font-medium text-black hover:bg-red-200 focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75 dark:bg-red-300 dark:hover:bg-red-400"
                  >
                    <span>
                      <img
                        src="/math.svg"
                        className="inline-block h-4 w-4 p-[1px] align-text-bottom"
                        alt="Math logo"
                      />
                      <h1 className="inline-block">Math</h1>
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } inline-block h-5 w-5`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      />
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
                    <Disclosure.Panel className="relative px-4 pt-1 pb-1 text-sm text-gray-600">
                      <ul className="ml-4 list-outside text-left ">
                        {props.lessons.math.map((lesson) => (
                          <li
                            key={lesson.slug}
                            className={`p-1 ${
                              router.query.slug == lesson.slug && "font-bold"
                            }`}
                          >
                            <Link
                              href={`/lessons/${props.type}/${lesson.slug}`}
                            >
                              <a>{lesson.title}</a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
            {user.uid && (
              <button
                type="button"
                onClick={openModal}
                className="m-auto my-3 block rounded-md bg-blue-600 bg-opacity-[0.85] px-4 py-2 text-sm font-medium text-white hover:bg-opacity-75"
              >
                Questions?
              </button>
            )}
            <Transition appear show={open} as={Fragment}>
              <Dialog
                as="div"
                className="fixed inset-0 z-[1000] overflow-y-auto"
                onClose={closeModal}
              >
                <div className="min-h-screen px-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-75" />
                  </Transition.Child>
                  <span
                    className="inline-block h-screen align-middle"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Questions?
                      </Dialog.Title>
                      <div className="mt-2">
                        <form className="space-y-3" onSubmit={formSubmit}>
                          <InputField
                            type="text"
                            name="title"
                            re={title}
                            labelName="Title"
                            className="dark:shadow-black/50"
                          />
                          <InputField
                            type="textarea"
                            name="desc"
                            re={desc}
                            labelName="Description"
                            className="h-16 dark:shadow-black/50"
                          />
                          <div className="flex justify-between">
                            <button
                              onClick={closeModal}
                              type="button"
                              className="rounded-md bg-gray-300 py-1.5 px-3 font-normal no-underline shadow-md dark:bg-gray-500"
                            >
                              Close
                            </button>
                            <button
                              type="submit"
                              className="rounded-md bg-blue-500 py-1.5 px-3 font-normal text-white no-underline shadow-md"
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition>
          </div>
        </div>
      </Sticky>
    </div>
  )
}

export { units }
