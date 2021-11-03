import db from "../components/clientApp"
import nookies from "nookies"
import { collection, doc, getDoc, getDocs, query, where } from "@firebase/firestore"
import { useState } from "react"
export default function Account({ user }) {
    const [u, setUser] = useState(null)
    const getUser = async () => {
        const u = await getDoc(doc(db, "users", user))
        return u
    }
    getUser().then(u => { setUser(u.data()) })
    return (
        <>
            <h1>Account page</h1>
            <p>Hello {user}</p>
        </>
    )
}

export async function getServerSideProps(ctx) {

    const uid = nookies.get(ctx, "uid").uid
    return {
        props: {
            user: uid
        }
    }
}