import { NextApiHandler } from "next"
import db from "../../components/serverApp"

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: 1, message: "Method not allowed" })
  } else {
    const body = req.query
    const usernameData = await db
      .collection("users")
      .where("username", "==", body.username)
      .get()
    if (!usernameData.empty) {
      res.status(200).json({ exists: true })
    } else {
      res.status(200).json({ exists: false })
    }
  }
}

export default handler
