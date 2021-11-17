import Head from "next/head"
import Link from "next/link"
import { useAuth } from "./userContext"
import { signInAnonymously, signOut } from "firebase/auth"
import { auth } from "./clientApp"
import Router, { useRouter } from "next/router"

export default function Layout({ children, title }) {
    return (
        <div>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="An open-source initiative to provide accessible and interactive learning for underprivileged kids through a web app." />
                <meta name="robots" content="index, follow" />
                <meta property="og:type" content="website" />
                <meta name="og:title" property="og:title" content="The STEAM Force" />
                <meta name="og:description" property="og:description" content="An open-source initiative to provide accessible and interactive learning for underprivileged kids through a web app." />
                <meta property="og:site_name" content="The STEAM Force" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="The STEAM Force" />
                <meta name="twitter:description" content="An open-source initiative to provide accessible and interactive learning for underprivileged kids through a web app." />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <title>The STEAM Force | {title || "404"}</title>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossOrigin="anonymous" defer></script>
            </Head>
            <nav className="bg-black fixed w-screen">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button type="button" data-bs-toggle="collapse" data-bs-target="#mobile-menu" className="collapsed inline-flex items-center justify-center p-2 nav-toggler rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-1 flex items-center pl-10 xs:items-center xs:p-0 xs:justify-start sm:items-stretch sm:justify-start">
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/">
                                    <a>
                                        <img className="block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
                                    </a>
                                </Link>
                            </div>
                            <div className="hidden sm:block sm:ml-6">
                                <div className="flex space-x-4">
                                    <a href="#" className="nav-link active">Dashboard</a>
                                    <a href="#" className="nav-link inactive">Team</a>
                                    <a href="#" className="nav-link inactive">Projects</a>
                                    <a href="#" className="nav-link inactive">Calendar</a>
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <RightNavLinks />
                        </div>
                    </div>
                </div>

                <div className="collapse nav-collapse" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <a href="#" className="nav-link mobile-nav active">Dashboard</a>

                        <a href="#" className="nav-link mobile-nav inactive">Team</a>

                        <a href="#" className="nav-link mobile-nav inactive">Projects</a>

                        <a href="#" className="nav-link mobile-nav inactive">Calendar</a>
                    </div>
                </div>
            </nav>
            <nav className="bg-black w-screen">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 h-16"></div>
            </nav>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">{children}</div>
        </div>
    )
}

function RightNavLinks() {
    const router = useRouter()
    const user = useAuth()
    if (user) {
        if (user.anonymous) {
            return <LoggedOutUser router={router} />
        } else {
            return <LoggedInUser user={user} />
        }
    } else {
        return <LoggedOutUser router={router} />
    }
}

function LoggedOutUser({ router }) {
    const freeTrial = () => {
        signInAnonymously(auth).then((userCredential) => {
            Router.push("/trial")
        })
    }
    return (<>
        <div className="flex space-x-1">
            <Link href="/login">
                <a className={router.pathname === "/login" ? "active nav-link" : "inactive nav-link"}>Login</a>
            </Link>
            <Link href="/signup">
                <a className={router.pathname === "/signup" ? "active nav-link" : "inactive nav-link"}>Signup</a>
            </Link>
            <a className={router.pathname === "/trial" ? "inactive nav-link cursor-pointer hover:bg-red bg-red" : "inactive nav-link cursor-pointer bg-green-600 hover:bg-green-600"} onClick={freeTrial}>Free Trial</a>
        </div>
    </>)
}

function LoggedInUser({ user }) {
    const formSubmit = () => {
        signOut(auth).then(() => {
            Router.push("/")
        })
    }
    return (
        <>
            <button type="button" className="bg-black p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">View notifications</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
            </button>

            <div className="ml-3 relative">
                <div>
                    <button type="button" data-bs-toggle="collapse" data-bs-target="#user-dropdown" className="bg-gray-50 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                        <span className="sr-only">Open user menu</span>
                        <img className="h-8 w-8 rounded-full" src="/avatar.svg" alt="" />
                    </button>
                </div>

                <div className="divide-y divide-gray-200 collapse origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" id="user-dropdown" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                    <div className="py-0.5">
                        <p className="block px-4 py-2 text-sm text-gray-700 dropdown-item" tabIndex="-1" role="menuitem">Signed in as <span className="font-bold">{user?.username}</span></p>
                    </div>
                    <div className="py-0.5">
                        <Link href="/account">
                            <a className="block px-4 py-2 text-sm text-gray-700 dropdown-item hover:bg-gray-100" role="menuitem" tabIndex="-1" id="user-menu-item-0">Courses</a>
                        </Link>
                        <Link href="/account/edit">
                            <a className="block px-4 py-2 text-sm text-gray-700 dropdown-item hover:bg-gray-100" role="menuitem" tabIndex="-1" id="user-menu-item-1">Edit Profile</a>
                        </Link>
                        <a className="cursor-pointer block px-4 py-2 text-sm text-gray-700 dropdown-item hover:bg-gray-100" role="menuitem" tabIndex="-1" id="user-menu-item-2" onClick={formSubmit}>Sign out</a>
                    </div>
                </div>
            </div>
        </>
    )
}