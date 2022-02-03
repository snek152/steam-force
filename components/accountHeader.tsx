import { useRouter } from "next/router"
import { useAuth } from "./userContext"

interface AccountHeaderProps {
  searches?: { title: string; slug: string; type: string }[]
}
export default function AccountHeader(props: AccountHeaderProps) {
  const [user] = useAuth()
  const router = useRouter()
  return (
    <header className="bg-white dark:bg-black shadow dark:shadow-white/30">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 flex items-center justify-between">
          {!user.offline ? (
            <span>Welcome back, {user.username}.</span>
          ) : (
            <span>Offline</span>
          )}
          {props.searches && <h1>hi</h1>}
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
