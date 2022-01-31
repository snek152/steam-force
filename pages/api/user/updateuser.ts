import { NextApiHandler } from "next"
import db from "../../../components/serverApp"
import admin from "firebase-admin"

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "PATCH") {
    res.status(405).json({ error: 1, message: "Method not allowed" })
  } else {
    const body = JSON.parse(req.body)
    if (body.method) {
      await db
        .collection("users")
        .doc(body.uid)
        .update({
          [body.field]: admin.firestore.FieldValue[body.update](...body.args),
        })
    } else {
      await db
        .collection("users")
        .doc(body.uid)
        .update({
          [body.field]: body.update,
        })
    }
    res.status(200).json({ message: "Success" })
  }
}

export default handler
