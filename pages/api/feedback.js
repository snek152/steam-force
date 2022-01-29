import { Octokit } from "octokit"
import { v4 } from "uuid"
import Cors from "cors"

function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
}

const cors = initMiddleware(
  Cors({
    methods: ["POST"],
  }),
)

export default async function handler(req, res) {
  await cors(req, res)
  if (req.method !== "POST") {
    res.status(405).json({ error: 1, message: "Method not allowed" })
  } else {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
    const body = JSON.parse(req.body)
    try {
      await octokit.request("POST /repos/{owner}/{repo}/issues", {
        owner: "SneK152",
        repo: "steam-force",
        title: body.title,
        body: `posted by ${
          body.email ? body.email : "anonymous"
        } about the lesson ${body.lesson}
      ${body.body}`,
        labels: ["question"],
      })
    } catch (e) {
      res.status(500).json({ error: 1, message: e })
    }
    res.status(200).json({ error: 0, message: "Success" })
  }
}
