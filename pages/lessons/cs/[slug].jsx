import { markdownToHtml, getPostBySlug, getAllPosts } from "../../../components/courses"
import matter from "gray-matter"
import Layout from "../../../components/layout"
import Sidebar from "../../../components/sidebar"
import fs from "fs"
import { join } from "path"
import AccountHeader from "../../../components/accountHeader"
import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { doc, updateDoc } from "firebase/firestore"
import { useAuth } from "../../../components/userContext"
import db from "../../../components/clientApp"


export default function CSLesson({ data, content, lessons }) {
    const router = useRouter()
    const user = useAuth()
    useEffect(() => {
        const fn = async () => {
            try {
                await updateDoc(doc(db, "users", user.uid), {
                    current: router.asPath
                })
                await updateDoc(doc(db, "users", user.uid), {
                    courses: {
                        cs: data.slug
                    }
                })
            }
            catch { }
        }
        fn()
    }, [router.asPath])
    return <Layout title={data.title} container={false}>
        <AccountHeader />
        <div className="flex max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 relative flex-grow">
            <Sidebar lessons={lessons} type="cs" />
            <div className="inline-block prose prose-h2:border-t-2 prose-h2:pt-5 border p-4 shadow-lg rounded-2xl border-opacity-80 bg-white max-w-none w-9/12">
                <h1>{data.heading}</h1>
                <p className="mb-0">In this section you will {data.desc}.</p>
                <div dangerouslySetInnerHTML={{ __html: content }}></div>
                <div className="flex justify-between h-10">
                    <Link href={`/lessons/cs/${data.prev}`}>
                        <a className={`bg-gray-300 rounded-md shadow-md no-underline pt-[0.4rem] px-3 font-light ${data.prev ? "" : "pointer-events-none bg-gray-200 text-gray-400"}`}>
                            Previous
                        </a>
                    </Link>
                    <Link href={`/lessons/cs/${data.next}`}>
                        <a className={`bg-blue-500 rounded-md shadow-md no-underline text-white pt-[0.4rem] px-3 font-light ${data.next ? "" : "pointer-events-none bg-blue-300 text-gray-100"}`}>
                            Next
                        </a>
                    </Link>
                </div>
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