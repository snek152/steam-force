/* eslint-disable @next/next/no-img-element */
import { useAuth } from "./userContext"
import { Dialog, Disclosure, Transition } from "@headlessui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Fragment, useEffect, useRef, useState } from "react"
import $ from "jquery"
import Sticky from "react-stickynode"
import InputField from "./inputField"
import { auth } from "./clientApp"
const units = {
  cs: {
    cp: "Computer Programming",
    cs: "Computer Science",
  },
}

export default function Sidebar({ lessons, type, currentTitle }) {
  const user = useAuth()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [width, setWidth] = useState(0)
  const openModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }
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
  const formSubmit = async (e) => {
    e.preventDefault()
    await fetch(
      `${
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://steam-force.vercel.app"
      }/api/feedback`,
      {
        method: "POST",
        body: JSON.stringify({
          title: title.current.value,
          body: desc.current.value,
          email: auth.currentUser.email,
          lesson: currentTitle,
        }),
      },
    )
  }
  return (
    <div className="w-full sm:w-3/12 inline-block relative">
      <Sticky top={88} enabled={width > 640}>
        <div className="p-2">
          <h1 className="font-semibold text-center text-lg">Courses</h1>
          <p className="text-center">
            Points:{" "}
            {user.offline ? (
              <strong>not available</strong>
            ) : (
              <strong>{user.points}</strong>
            )}
          </p>
          <div className="sm:max-w-md py-2 mr-2 rounded-2xl">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="science my-2 flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-black bg-green-100 dark:bg-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-400 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75">
                    <span>
                      <img
                        src="/science.svg"
                        className="h-4 w-4 align-text-bottom p-[1px] inline-block"
                        alt="Science logo"
                      />
                      <h1 className="inline-block">Science</h1>
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 inline-block`}
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
                    <Disclosure.Panel className="px-4 pt-1 pb-1 text-sm text-gray-600 relative">
                      <ul className="list-outside text-left ml-4">
                        {lessons.science.map((lesson) => (
                          <li
                            key={lesson.slug}
                            className={`p-1 hover:underline ${
                              router.query.slug == lesson.slug && "font-bold"
                            }`}
                          >
                            <Link href={`/lessons/${type}/${lesson.slug}`}>
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
                  <Disclosure.Button className="cs my-2 flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-black bg-blue-100 dark:bg-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-400 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                    <span>
                      <img
                        src="/cs.svg"
                        className="h-4 w-4 align-text-bottom p-[1px] inline-block"
                        alt="Engineering logo"
                      />
                      <h1 className="inline-block">Engineering</h1>
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 inline-block`}
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
                    <Disclosure.Panel className="px-4 pt-1 pb-1 text-sm text-gray-600 relative">
                      {Object.keys(units.cs).map((key) => (
                        <Disclosure key={key}>
                          <Disclosure.Button className="rounded-lg border w-full border-gray-200 p-1 mb-2 bg-gray-200 dark:bg-gray-700 dark:border-gray-700 dark:text-white">
                            <h1 className="text-sm inline-block">
                              {units.cs[key]}
                            </h1>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={`${
                                open ? "transform rotate-180" : ""
                              } w-5 h-5 inline-block`}
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
                              <ul className="list-outside text-left ml-4 mb-2 ">
                                {lessons.cs.map(
                                  (lesson) =>
                                    lesson.unit == units.cs[key] && (
                                      <li
                                        key={lesson.slug}
                                        className={`p-1 text-sm hover:underline dark:text-white ${
                                          router.query.slug == lesson.slug &&
                                          "font-bold"
                                        }`}
                                      >
                                        <Link
                                          href={`/lessons/${type}/${lesson.slug}`}
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
                  <Disclosure.Button className="math my-2 flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-black bg-red-100 dark:bg-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-400 focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75">
                    <span>
                      <img
                        src="/math.svg"
                        className="h-4 w-4 align-text-bottom p-[1px] inline-block"
                        alt="Math logo"
                      />
                      <h1 className="inline-block">Math</h1>
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 inline-block`}
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
                    <Disclosure.Panel className="px-4 pt-1 pb-1 text-sm text-gray-600 relative">
                      <ul className="list-outside text-left ml-4 ">
                        {lessons.math.map((lesson) => (
                          <li
                            key={lesson.slug}
                            className={`p-1 ${
                              router.query.slug == lesson.slug && "font-bold"
                            }`}
                          >
                            <Link href={`/lessons/${type}/${lesson.slug}`}>
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
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 block m-auto my-3 rounded-md bg-opacity-[0.85] hover:bg-opacity-75"
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
                    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
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
                            autoComplete="off"
                          />
                          <InputField
                            type="textarea"
                            name="desc"
                            re={desc}
                            labelName="Description"
                            className="h-16 dark:shadow-black/50"
                            autoComplete="off"
                          />
                          <div className="flex justify-between">
                            <button
                              onClick={closeModal}
                              type="button"
                              className="bg-gray-300 dark:bg-gray-500 rounded-md shadow-md no-underline py-1.5 px-3 font-normal"
                            >
                              Close
                            </button>
                            <button
                              type="submit"
                              className="bg-blue-500 rounded-md shadow-md no-underline text-white py-1.5 px-3 font-normal"
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
