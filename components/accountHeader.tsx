import Link from "next/link"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { useAuth } from "./userContext"

interface AccountHeaderProps {
  searches?: { title: string; slug: string; type: string }[]
}
export default function AccountHeader(props: AccountHeaderProps) {
  const [user] = useAuth()
  const router = useRouter()
  const [search, setSearch] = useState("")
  const re = useRef<HTMLInputElement>(null)
  const sortedList = props.searches?.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  )
  return (
    <header className="bg-white shadow dark:bg-black dark:shadow-white/30">
      <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="flex flex-col items-center justify-between gap-4 space-y-4 text-3xl font-bold text-gray-900 dark:text-gray-50 sm:flex-row sm:space-y-0">
          {!user.offline ? (
            <span>Welcome back, {user.username}.</span>
          ) : (
            <span>Offline</span>
          )}
          {router.pathname.includes("/lessons") && (
            <div className="relative">
              <label htmlFor="search" className="sr-only">
                Search Lessons
              </label>
              <div className="pointer-events-none absolute inset-y-0 left-0 z-50 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </span>
              </div>
              <input
                id="search"
                name="search"
                type="text"
                autoComplete="off"
                required
                value={search}
                ref={re}
                className="relative block w-full appearance-none rounded-md border border-gray-100 px-3 py-2 pl-8 text-gray-900 placeholder-gray-500 shadow-md transition-colors duration-[10000000000s] focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-other-700 dark:bg-black dark:text-gray-50 dark:placeholder-other-400 dark:shadow dark:shadow-white/10 sm:w-56 sm:text-sm md:w-96"
                placeholder="Search Lessons"
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && document.activeElement == re.current && (
                <div className="absolute z-50 w-full rounded-lg border-gray-100 bg-white p-3 shadow-lg dark:bg-other-800 dark:shadow-white/10">
                  <ul className="select-none text-sm font-semibold">
                    {sortedList.map((item, index) => (
                      <Link
                        href={`/lessons/${item.type}/${item.slug}`}
                        key={index}
                      >
                        <a className="block rounded-md p-1 px-2 hover:bg-gray-100 dark:hover:bg-other-700">
                          <li>{item.title}</li>
                        </a>
                      </Link>
                    ))}
                    {sortedList.length === 0 && (
                      <li className="block rounded-md p-1 px-2">
                        No lessons matched your search.
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}
          <span
            className="cursor-pointer space-x-1 hover:underline"
            onClick={() => router.push("/account/contribute")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            <span className="text-xl font-semibold">Contribute Content</span>
          </span>
        </h1>
      </div>
    </header>
  )
}
