import { NextApiHandler } from "next"
import db from "../../../components/serverApp"

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: 1, message: "Method not allowed" })
  } else {
    const body = JSON.parse(req.body)
    await db
      .collection("users")
      .doc(body.uid)
      .set({
        username: req.body.username,
        profileUrl: null,
        courses: {
          math: null,
          science: null,
          cs: null,
        },
        points: 0,
        current: null,
      })
    res.status(200).json({ message: "Success" })
  }
}

export default handler
