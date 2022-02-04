import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
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
    <header className="bg-white dark:bg-black shadow dark:shadow-white/30">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 flex items-center justify-between sm:flex-row flex-col space-y-4 sm:space-y-0 gap-4">
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
              <div className="absolute z-50 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
                className="dark:bg-black appearance-none transition-colors duration-[10000000000s] pl-8 rounded-md relative block md:w-96 sm:w-56 w-full px-3 py-2 border border-gray-100 dark:border-other-700 placeholder-gray-500 dark:placeholder-other-400 text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm shadow-md dark:shadow-white/10 dark:shadow"
                placeholder="Search Lessons"
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && document.activeElement == re.current && (
                <div className="absolute bg-white dark:bg-other-800 z-50 w-full rounded-lg p-3 shadow-lg dark:shadow-white/10 border-gray-100">
                  <ul className="text-sm font-semibold select-none">
                    {sortedList.map((item, index) => (
                      <Link
                        href={`/lessons/${item.type}/${item.slug}`}
                        key={index}
                      >
                        <a className="p-1 px-2 hover:bg-gray-100 dark:hover:bg-other-700 rounded-md block">
                          <li>{item.title}</li>
                        </a>
                      </Link>
                    ))}
                    {sortedList.length === 0 && (
                      <li className="p-1 px-2 rounded-md block">
                        No lessons matched your search.
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}
          <span
            className="space-x-1 hover:underline cursor-pointer"
            onClick={() => router.push("/account/contribute")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline-block"
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
