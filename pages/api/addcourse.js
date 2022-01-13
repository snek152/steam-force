import { Octokit } from "octokit"
import { v4 } from "uuid"


export default async function handler(req, res) {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
    const body = "hallo world" // JSON.parse(req.body)
    const file = btoa(body)
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
        path: "courses/testing.md",
        message: "Adding file for review",
        content: file,
        branch: branchName,
    })
    await octokit.request("POST /repos/{owner}/{repo}/pulls", {
        owner: "SneK152",
        repo: "steam-force",
        title: "PLACEHOLDER TITLE HERE",
        head: branchName,
        base: "main",
    })
    res.json({ hi: "hi" })
}