import { auth } from "../components/clientApp"
import { onAuthStateChanged } from "@firebase/auth"
export default function Account({ user }) {
    console.log(user)
    return (
        <h1>Account page</h1>
    )
}

export async function getServerSideProps() {
    let currentUser = null;

    return {
        props: {
            user: currentUser
        }
    }
}