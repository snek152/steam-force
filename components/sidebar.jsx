import { useAuth } from "./userContext"

export default function Sidebar() {
    const user = useAuth()
    return <div className="w-3/12 inline-block relative">
        <div className="sticky top-[88px]">
            Points: <strong>{user.points}</strong>
        </div>
    </div>
}