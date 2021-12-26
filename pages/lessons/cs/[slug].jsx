import { markdownToHtml, getPostBySlug } from "../../../components/courses"
import matter from "gray-matter"
import Layout from "../../../components/layout"
import Sidebar from "../../../components/sidebar"
import fs from "fs"
import { join } from "path"
import AccountHeader from "../../../components/accountHeader"


export default function CSLesson({ data, content }) {
    return <Layout title={data.title} container={false}>
        <AccountHeader />
        <div className="flex max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 relative flex-grow">
            <Sidebar />
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