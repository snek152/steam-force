import { getAuth } from "firebase/auth"
import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"
import { getApps } from "firebase/app"
import { getURL } from "next/dist/shared/lib/utils"

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "steam-force.firebaseapp.com",
  projectId: "steam-force",
  storageBucket: "steam-force.appspot.com",
  messagingSenderId: "527388890460",
  appId: "1:527388890460:web:0b1cde44a5da5792b9dd99",
  measurementId: "G-Z33D1ZSYST",
}
if (!getApps().length) {
  initializeApp(firebaseConfig)
}
const auth = getAuth()
const storage = getStorage()

export { auth, storage }
