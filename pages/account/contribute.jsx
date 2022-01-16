import Layout from "../../components/layout"
import { useEffect, useRef, useState } from "react"
import markdownToHtml from "../../components/markdown"
import $ from "jquery"

export default function AdminPanel() {
    const heading = useRef(null)
    const title = useRef(null)
    const desc = useRef(null)
    const lesson = useRef(null)
    const question = useRef(null)
    const answer1 = useRef(null)
    const answer2 = useRef(null)
    const answer3 = useRef(null)
    const answer4 = useRef(null)
    const correct = useRef(null)
    const unit = useRef(null)
    const content = useRef(null)
    const formSubmit = async (e) => {
        e.preventDefault()
        await fetch(`${process.env.NODE_ENV === "development" ? "localhost:3000" : "steam-force.vercel.app"}/api/addcourse`, {
            method: "POST",
            body: JSON.parse({

            })
        })
    }
    return <Layout title="Contribute Content" container={false}>
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Contribute
                </h1>
            </div>
        </header>
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <form onSubmit={formSubmit} className="divide-y-1 space-y-5">
                <InputField labelName="Title" ref={title} name="title" type="text" />
                <InputField labelName="Heading" ref={heading} name="heading" type="text" />
                <InputField labelName="Description" ref={desc} name="desc" type="text" />
                <span className="inline-block">
                    <label htmlFor="content" className="text-gray-500 text-sm">Lesson Content</label>
                    <input accept="text/markdown" ref={content} id="content" name="content" type="file" required hidden />
                </span>
                <button type="submit" className="block">Submit</button>
            </form>
        </div>
    </Layout>
}

function InputField({ labelName, ref, name, type }) {
    return <><label htmlFor={name} className="sr-only">{labelName}</label>
        <input ref={ref} id={name} name={name} type={type} required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder={labelName} />
    </>
}

