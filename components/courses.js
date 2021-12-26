import { remark } from "remark"
import html from "remark-html"
import fs from "fs"
import { join } from "path"

export async function markdownToHtml(markdown) {
    const result = await remark().use(html).process(markdown)
    return result.toString()
}

export function getPostBySlug(slug) {
    const realSlug = slug.replace(/\.md$/, "")
    const fullPath = join(process.cwd(), "courses/cs", `${realSlug}.md`)
    const fileContents = fs.readFileSync(fullPath, "utf-8")
    return fileContents
}