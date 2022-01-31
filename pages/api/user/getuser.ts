import { NextApiHandler } from "next"
import db from "../../../components/serverApp"

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: 1, message: "Method not allowed" })
  } else {
    const body = req.query
    try {
      const data = await db
        .collection("users")
        .doc(body.username as string)
        .get()
      res.status(200).json({ error: 0, data: data.data() })
    } catch (e) {
      res.status(500).json({ error: 1 })
    }
  }
}

export default handler
