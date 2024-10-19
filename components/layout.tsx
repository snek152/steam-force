/* eslint-disable @next/next/no-img-element */
import Head from "next/head"
import Link from "next/link"
import { useAuth } from "./userContext"
import { signInAnonymously, signOut } from "firebase/auth"
import { auth } from "../lib/clientApp"
import Router, { useRouter } from "next/router"
import { ReactNode, useEffect, useState } from "react"
import { Menu, Switch, Transition } from "@headlessui/react"
import { Fragment } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"

interface LeftNavLinksProps {
  mobile?: boolean
}

interface LayoutProps {
  children: ReactNode
  title: string
  container?: boolean
  noNav?: boolean
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

function LeftNavLinks(props: LeftNavLinksProps) {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [darkMode, setDarkMode] = useState(false)
  useEffect(() => {
    if (theme === "dark" || theme === "system") {
      setDarkMode(true)
    } else {
      setDarkMode(false)
    }
  }, [theme])
  return (
    <>
      <Link href="/">
        <a
          className={`nav-link ${props.mobile ? "mobile-nav" : ""} ${
            router.pathname == "/" ? "active" : "inactive"
          }`}
        >
          Home
        </a>
      </Link>
      {/* <a
        href="#"
        className={`nav-link ${props.mobile ? "mobile-nav" : ""} ${
          router.pathname == "/about" ? "active" : "inactive"
        }`}
      >
        About
      </a> */}
      <Switch
        checked={darkMode}
        onChange={() =>
          setTheme(theme === "light" || theme === "system" ? "dark" : "light")
        }
        className={`${darkMode ? "bg-other-700" : "bg-other-200"}
          relative inline-flex h-[20.9px] w-[40.7px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Toggle dark mode</span>
        <span
          aria-hidden="true"
          className={`${darkMode ? "translate-x-[19.8px]" : "translate-x-0"}
            pointer-events-none inline-block h-[16.5px] w-[16.5px] transform rounded-full bg-other-700 shadow-lg ring-0 transition duration-200 ease-in-out dark:bg-white`}
        />
      </Switch>
    </>
  )
}

export default function Layout(props: LayoutProps) {
  const [user] = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (
      (router.pathname == "/login" || router.pathname == "/signup") &&
      user.loading === undefined &&
      user.uid !== null &&
      !user.anonymous
    ) {
      Router.push("/dashboard")
    } else if (
      router.pathname.includes("/dashboard") &&
      user.uid === null &&
      user.loading === false
    ) {
      Router.push("/")
    } else if (
      router.pathname.includes("/dashboard") &&
      user.anonymous === true
    ) {
      Router.push("/trial")
    } else if (
      router.pathname == "/trial" &&
      user.uid &&
      !user.loading &&
      !user.anonymous
    ) {
      Router.push("/dashboard")
    }
  }, [router.pathname, user.uid, user.loading, user.anonymous])

  return (
    <div
      className="min-h-screen bg-gray-50 font-sans dark:bg-other-900"
      lang="en"
    >
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, viewport-fit=cover"
        />
        <meta
          name="description"
          content="An open-source initiative to provide accessible and interactive learning for underprivileged kids through a web app."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/icon-192.png" />
        <meta name="og:title" property="og:title" content="The Steam Force" />
        <meta
          name="og:description"
          property="og:description"
          content="An open-source initiative to provide accessible and interactive learning for underprivileged kids through a web app."
        />
        <meta property="og:site_name" content="The Steam Force" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="The Steam Force" />
        <meta
          name="twitter:description"
          content="An open-source initiative to provide accessible and interactive learning for underprivileged kids through a web app."
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>The STEAM Force | {props.title || "404"}</title>
        <link rel="preconnect" href="https://apis.google.com/" />
        <link rel="preconnect" href="https://steam-force.firebaseapp.com" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="Steam Force" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PWA App" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icons/apple-icon-180.png" />
        <link
          rel="apple-touch-startup-image"
          href="/icons/apple-splash-2048-2732.jpg"
          media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icons/apple-splash-2732-2048.jpg"
          media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icons/apple-splash-1668-2388.jpg"
          media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icons/apple-splash-2388-1668.jpg"
          media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icons/apple-splash-1536-2048.jpg"
          media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icons/apple-splash-2048-1536.jpg"
          media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icons/apple-splash-1668-2224.jpg"
          media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icons/apple-splash-2224-1668.jpg"
          media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icons/apple-splash-1620-2160.jpg"
          media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icons/apple-splash-2160-1620.jpg"
          media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icons/apple-splash-1284-2778.jpg"
          media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icons/apple-splash-2778-1284.jpg"
          media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icons/apple-splash-1170-2532.jpg"
          media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icons/apple-splash-2532-1170.jpg"
          media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icons/apple-splash-1125-2436.jpg"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icons/apple-splash-2436-1125.jpg"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icons/apple-splash-1242-2688.jpg"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icons/apple-splash-2688-1242.jpg"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icons/apple-splash-828-1792.jpg"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icons/apple-splash-1792-828.jpg"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icons/apple-splash-1242-2208.jpg"
          media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icons/apple-splash-2208-1242.jpg"
          media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icons/apple-splash-750-1334.jpg"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icons/apple-splash-1334-750.jpg"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icons/apple-splash-640-1136.jpg"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icons/apple-splash-1136-640.jpg"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
      </Head>
      <nav className="fixed z-[1000] w-screen bg-white dark:bg-black">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mobile-menu"
                className="collapsed nav-toggler inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-200 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center pl-1 sm:items-stretch sm:justify-start sm:p-0 xs:items-center xs:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <Link href="/">
                  <a
                    style={{
                      filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                      borderRadius: 15,
                    }}
                  >
                    <img
                      className="block h-8 w-auto"
                      src="/logo.svg"
                      alt="STEAM Force Logo"
                    />
                  </a>
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex items-center space-x-4">
                  <LeftNavLinks />
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {user.offline ? (
                <div className="flex">
                  <p className="nav-link inactive">You are offline.</p>
                  <Link href="/lessons/cs/intro-cp">
                    <a className="active nav-link hover:bg-gray-600">Lessons</a>
                  </Link>
                </div>
              ) : (
                <RightNavLinks />
              )}
            </div>
          </div>
        </div>

        <div className="collapse nav-collapse duration-[0ms]" id="mobile-menu">
          <div className="space-y-1 px-2 pt-2 pb-3">
            <LeftNavLinks mobile={true} />
          </div>
        </div>
      </nav>
      {!props.noNav && (
        <nav className="w-screen bg-black">
          <div className="mx-auto h-16 max-w-7xl px-2 sm:px-6 lg:px-8"></div>
        </nav>
      )}
      <div
        className={
          props.container === false
            ? ""
            : "mx-auto max-w-7xl px-2 sm:px-6 lg:px-8"
        }
      >
        {props.children}
      </div>
    </div>
  )
}

function RightNavLinks() {
  const router = useRouter()
  const [user] = useAuth()
  if (user.loading === undefined || user.loading == false) {
    if (user.uid) {
      if (user.anonymous) {
        return <LoggedOutUser router={router} />
      } else {
        return <LoggedInUser user={user} />
      }
    } else {
      return <LoggedOutUser router={router} />
    }
  } else {
    return (
      <svg
        className="-ml-1 mr-3 h-5 w-5 animate-spin text-black dark:text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    )
  }
}

function LoggedOutUser({ router }) {
  const freeTrial = () => {
    signInAnonymously(auth).then((userCredential) => {
      Router.push("/trial")
    })
  }

  return (
    <>
      <div className="flex space-x-1">
        <Link href="/login">
          <a
            className={
              router.pathname === "/login"
                ? "active nav-link"
                : "inactive nav-link"
            }
          >
            Login
          </a>
        </Link>
        <Link href="/signup">
          <a
            className={
              router.pathname === "/signup"
                ? "active nav-link"
                : "inactive nav-link"
            }
          >
            Signup
          </a>
        </Link>
        <button
          className={
            router.pathname === "/trial"
              ? "inactive nav-link cursor-pointer bg-red hover:bg-red"
              : "inactive nav-link cursor-pointer bg-green-500 hover:bg-green-500"
          }
          onClick={freeTrial}
        >
          Free Trial
        </button>
      </div>
    </>
  )
}

function DropdownLink(props) {
  let { href, children, ...rest } = props
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  )
}

function LoggedInUser({ user }) {
  const formSubmit = () => {
    signOut(auth).then(() => {
      Router.push("/")
    })
  }
  return (
    <>
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button className="flex rounded-full bg-other-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 dark:bg-gray-100">
            <span className="sr-only">Open user menu</span>
            {user.profileUrl ? (
              <Image
                className="rounded-full"
                height={32}
                width={32}
                loading="eager"
                src={user.profileUrl}
                alt="User profile"
              />
            ) : (
              <Image
                className="rounded-full"
                height={32}
                width={32}
                loading="eager"
                src="/avatar.svg"
                alt="User profile"
              />
            )}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-200 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-black dark:shadow-white/20 dark:ring-white">
            <div className="py-1">
              <p
                className="dropdown-item block px-4 py-1 text-sm text-gray-700 dark:text-gray-200"
                tabIndex={-1}
                role="menuitem"
              >
                Signed in as <span className="font-bold">{user?.username}</span>
              </p>
            </div>
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <DropdownLink
                    href="/dashboard"
                    className={classNames(
                      active ? "bg-gray-100 dark:bg-other-700" : "",
                      "block px-4 py-2 text-sm text-gray-700 dark:text-gray-200",
                    )}
                  >
                    Dashboard
                  </DropdownLink>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <DropdownLink
                    href="/dashboard/edit"
                    className={classNames(
                      active ? "bg-gray-100 dark:bg-other-700" : "",
                      "block px-4 py-2 text-sm text-gray-700 dark:text-gray-200",
                    )}
                  >
                    Edit Profile
                  </DropdownLink>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={classNames(
                      active ? "bg-gray-100 dark:bg-other-700" : "",
                      "block cursor-pointer px-4 py-2 text-sm text-gray-700 dark:text-gray-200",
                    )}
                    onClick={formSubmit}
                  >
                    Sign Out
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}
