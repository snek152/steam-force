import { remark } from "remark"
import html from "remark-html"
import fs from "fs"
import { join } from "path"
import matter from "gray-matter"

export async function markdownToHtml(markdown) {
    const result = await remark().use(html).process(markdown)
    return result.toString()
}

export function getPostBySlug(slug, type) {
    const realSlug = slug.replace(/\.md$/, "")
    const fullPath = join(process.cwd(), `courses/${type}`, `${realSlug}.md`)
    const fileContents = fs.readFileSync(fullPath, "utf-8")
    return fileContents
}

export function getAllPosts(type) {
    const slugs = fs.readdirSync(join(process.cwd(), `courses/${type}`))
    const posts = slugs.map((slug) => {
        const data = matter(getPostBySlug(slug, type)).data
        return {
            title: data.title,
            lesson: data.lesson,
            slug: data.slug,
            unit: data.unit
        }
    }).sort((a, b) => {
        return a.lesson - b.lesson
    })
    return posts
}