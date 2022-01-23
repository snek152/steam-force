import { Octokit } from "octokit"
import { v4 } from "uuid"
import Cors from "cors"

function initMiddleware(middleware) {
    return (req, res) => new Promise((resolve, reject) => {
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
        methods: ["POST"]
    })
)

export default async function handler(req, res) {
    await cors(req, res)
    if (req.method !== "POST") {
        res.status(405).json({ error: 1, message: "Method not allowed" })
    }
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
    const body = JSON.parse(req.body)
    const fileContents = `title: ${body.title}
slug: null
question: ${body.question}
answerchoices: [${body.answer1}, ${body.answer2}, ${body.answer3}, ${body.answer4}]
correct: ${body.correct}
heading: ${body.heading}
lesson: 0
prev: null
next: null
desc: ${body.description}
unit: ${body.unit}

${body.content}`
    const file = btoa(fileContents)
    try {
        const resp = await octokit.request("GET /repos/{owner}/{repo}/commits/{ref}", {
            owner: "SneK152",
            repo: "steam-force",
            ref: "main"
        })
        const sha = resp.data.sha
        const branchName = "review-" + v4()
        await octokit.request("POST /repos/{owner}/{repo}/git/refs", {
            owner: "SneK152",
            repo: "steam-force",
            ref: `refs/heads/${branchName}`,
            sha: sha
        })
        await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
            owner: "SneK152",
            repo: "steam-force",
            path: `courses/${req.body.course}/lessonForReview.md`,
            message: "Adding file for review",
            content: file,
            branch: branchName,
        })
        await octokit.request("POST /repos/{owner}/{repo}/pulls", {
            owner: "SneK152",
            repo: "steam-force",
            title: `Lesson For Review - ${body.title}`,
            head: branchName,
            base: "main",
        })
    } catch (e) {
        res.status(500).json({ error: 1, message: e })
    }
    res.status(200).json({ error: 0, message: "Success" })
}