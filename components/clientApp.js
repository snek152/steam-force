import { getAuth } from "@firebase/auth";
import { initializeApp, getApps } from "firebase/app"
import { getFirestore, collection, getDoc, doc } from "firebase/firestore"

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "steam-force.firebaseapp.com",
    projectId: "steam-force",
    storageBucket: "steam-force.appspot.com",
    messagingSenderId: "527388890460",
    appId: "1:527388890460:web:0b1cde44a5da5792b9dd99",
    measurementId: "G-Z33D1ZSYST"
}
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const db = getFirestore(app)

export default db
export { auth }