import Layout from "../../components/layout"
import { useEffect, useRef, useState } from "react"

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
    const contentValue = useRef(null)
    const [content, setContent] = useState("Lesson Content (MD format)")
    const formSubmit = async (e) => {
        e.preventDefault()
        console.log("submitted!!")
        // await fetch(`${process.env.NODE_ENV === "development" ? "localhost:3000" : "steam-force.vercel.app"}/api/addcourse`, {
        //     method: "POST",
        //     body: JSON.parse({

        //     })
        // })
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
            <form onSubmit={formSubmit} className="space-y-5">
                <span className="flex space-y-5">
                    <InputField labelName="Title" ref={title} name="title" type="text" className="mr-2 inline-block" />
                    <InputField labelName="Heading" ref={heading} name="heading" type="text" className="ml-2 inline-block" />
                </span>
                <InputField labelName="Description" ref={desc} name="desc" type="text" />
                <span className="rounded-md relative block w-full px-1.5 py-1 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm">
                    <label htmlFor="content" className="text-gray-500 text-sm cursor-pointer flex flex-auto items-center">
                        <span className="shadow rounded-lg bg-blue-500 h-10 inline-flex items-center justify-center w-10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-white" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                        </span>
                        <p className="inline-block text-base ml-2 h-full">{content}</p>
                    </label>
                    <input accept="text/markdown" ref={contentValue} onChange={e => setContent(e.target.files[0].name)} id="content" name="content" type="file" required hidden />
                </span>
                <InputField labelName="Question" ref={question} name="question" type="text" />
                <span className="bg-white flex flex-row flex-grow p-1 rounded-md relative w-1/2 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm">
                    <input type="radio" id="answer1" name="answer1" className="h-4 w-4 focus:outline-none focus:ring-transparent align-middle mt-[3px] mr-2" />
                    <input className="inline-block align-baseline text-gray-500" />
                </span>
                <button type="submit" className="block">Submit</button>
            </form>
        </div>
    </Layout>
}

function InputField({ labelName, ref, name, type, className }) {
    return <><label htmlFor={name} className="sr-only">{labelName}</label>
        <input ref={ref} id={name} name={name} type={type} required className={`${className} appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`} placeholder={labelName} />
    </>
}

