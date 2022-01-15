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
    const [content, setContent] = useState(null)
    const [preview, setPreview] = useState(null)
    const formSubmit = async (e) => {
        e.preventDefault()
        await fetch(`${process.env.NODE_ENV === "development" ? "localhost:3000" : "steam-force.vercel.app"}/api/addcourse`, {
            method: "POST",
            body: JSON.parse({

            })
        })
    }
    useEffect(() => {
        const fn = async () => {
            try {
                const file = await markdownToHtml(content?.toString())
                setPreview(file)
            } catch { }
        }
        fn()
    }, [content])
    useEffect(() => {
        $("textarea").each(function () {
            this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
        }).on("input", function () {
            this.style.height = "auto";
            this.style.height = (this.scrollHeight) + "px";
        });
    }, [])
    return <Layout title="Contribute Content">
        <form onSubmit={formSubmit}>
            <InputField labelName="Title" ref={title} name="title" type="text" />
            <InputField labelName="Heading" ref={heading} name="heading" type="text" />
            <InputField labelName="Description" ref={desc} name="desc" type="text" />
            <div className="flex flex-1">
                <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Lesson Content" className="w-1/2 appearance-none h-full rounded-md relative inline-block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" />
                <div className="w-1/2 inline-block">
                    <h1>Preview</h1>
                    <div className="prose" dangerouslySetInnerHTML={{ __html: preview }}></div>
                </div>
            </div>
            <button type="submit">Submit</button>
        </form>
    </Layout>
}

function InputField({ labelName, ref, name, type }) {
    return <><label htmlFor={name} className="sr-only">Title</label>
        <input ref={ref} id={name} name={name} type={type} required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder={labelName} />
    </>
}