import { useState } from "react"
import { signOut } from "@firebase/auth"
import { auth } from "../components/clientApp"
import Router from "next/router"
import Layout from "../components/layout"
import { getPostBySlug, markdownToHtml } from "../components/courses"
import matter from "gray-matter"
export default function Trial({ content }) {
    const formSubmit = () => {
        signOut(auth)
            .then(() => {
                Router.push("/signup")
            })
            .catch((error) => {
                let code = error.code.substring(5).replace(/-/g, ' ')
                code = code.charAt(0).toUpperCase() + code.slice(1)
                console.log(code)
            })
    }
    return (
        <Layout title="Free Trial">
            <div className="prose">
                <h1>Free Trial</h1>
                <div dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const fileContents = ["intro-cp", "env", "syntax"].map(s => {
        return matter(getPostBySlug(s, "cs")).content
    }).join()
    return {
        props: {
            content: await markdownToHtml(fileContents)
        }
    }
}