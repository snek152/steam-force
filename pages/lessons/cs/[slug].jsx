import { markdownToHtml, getPostBySlug, getAllPosts } from "../../../components/courses"
import matter from "gray-matter"
import Layout from "../../../components/layout"
import Sidebar from "../../../components/sidebar"
import fs from "fs"
import { join } from "path"
import AccountHeader from "../../../components/accountHeader"


export default function CSLesson({ data, content, lessons }) {
    return <Layout title={data.title} container={false}>
        <AccountHeader />
        <div className="flex max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 relative flex-grow">
            <Sidebar lessons={lessons} type="cs" />
            <div className="inline-block prose">
                <h1>{data.heading}</h1>
                <div dangerouslySetInnerHTML={{ __html: content }} ></div>
            </div>
        </div>
    </Layout>
}

export async function getStaticProps({ params }) {
    const fileContents = getPostBySlug(params.slug, "cs")
    const { data, content } = matter(fileContents)
    const cont = await markdownToHtml(content)
    return {
        props: {
            content: cont,
            data: data,
            lessons: {
                cs: getAllPosts("cs"),
                math: getAllPosts("math"),
                science: getAllPosts("science")
            }
        }
    }
}

export async function getStaticPaths() {
    const slugs = fs.readdirSync(join(process.cwd(), "courses/cs"))
    const posts = slugs.map((slug) => { return { slug: matter(getPostBySlug(slug, "cs")).data.slug } })
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