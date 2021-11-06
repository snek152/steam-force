import admin from "firebase-admin"
import { getApp } from "firebase-admin/app";
let app = null;
if (!admin.apps.length) {
    app = admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT)),
        databaseURL: "https://steam-force.firebaseio.com"
    }, "adminapp")
} else {
    app = getApp("adminapp")
}
export default app