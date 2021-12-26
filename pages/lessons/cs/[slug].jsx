import { remark } from "remark"
import html from "remark-html"
import fs from "fs"
import { join } from "path"
import matter from "gray-matter"
import Layout from "../../../components/layout"

async function markdownToHtml(markdown) {

    const result = await remark().use(html).process(markdown)
    return result.toString()
}

function getPostBySlug(slug) {
    const realSlug = slug.replace(/\.md$/, "")
    const fullPath = join(process.cwd(), "courses/cs", `${realSlug}.md`)
    const fileContents = fs.readFileSync(fullPath, "utf-8")
    return fileContents
}

export default function CSLesson({ data, content }) {
    return <Layout title={data.title}>
        <div className="flex">
            <div className="h-[calc(100vh-64px)] w-3/12 inline-block">
                <div>Points: <strong>0</strong></div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: content }} className="inline-block prose"></div>
        </div>
    </Layout>
}

export async function getStaticProps({ params }) {
    const fileContents = getPostBySlug(params.slug)
    const { data, content } = matter(fileContents)
    const cont = await markdownToHtml(content)
    return {
        props: {
            content: cont,
            data: data
        }
    }
}

export async function getStaticPaths() {
    const slugs = fs.readdirSync(join(process.cwd(), "courses/cs"))
    const posts = slugs.map((slug) => { return { slug: matter(getPostBySlug(slug)).data.slug } })
    return {
        paths: posts.map((post) => {
            return {
                params: {
                    slug: post.slug
                }
            }
        }),
        fallback: false
    }
}