import Layout from "../../components/layout"
import { useRef, useState, Fragment, FormEvent } from "react"
import { Listbox, Transition } from "@headlessui/react"
import dynamic from "next/dynamic"
import { fetchData } from "../../lib/utils"
// import InputField from "../../components/inputField"

const InputField = dynamic(() => import("../../components/inputField"))

const courses = [
  { name: "Engineering", slug: "cs" },
  { name: "Math", slug: "math" },
  { name: "Science", slug: "science" },
]

export default function AdminPanel() {
  const heading = useRef(null)
  const title = useRef(null)
  const desc = useRef(null)
  const [course, setCourse] = useState({
    name: "Choose a course.",
    slug: "err",
  })
  const question = useRef(null)
  const answer1 = useRef(null)
  const answer2 = useRef(null)
  const answer3 = useRef(null)
  const answer4 = useRef(null)
  const [correct, setCorrect] = useState(null)
  const unit = useRef(null)
  const contentValue = useRef(null)
  const [content, setContent] = useState("Lesson Content (MD format)")
  const [error, setError] = useState("")
  const readFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        resolve(reader.result as string)
      }
      reader.onerror = reject
      reader.readAsText(file, "UTF-8")
    })
  }
  const formSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const fileContents = await readFile(contentValue.current.files[0])
    const correctVal =
      answer1.current.id === correct
        ? answer1.current.value
        : answer2.current.id === correct
        ? answer2.current.value
        : answer3.current.id === correct
        ? answer3.current.value
        : answer4.current.value
    const res = await fetchData("/api/addcourse", {
      method: "POST",
      body: JSON.stringify({
        title: title.current.value,
        heading: heading.current.value,
        description: desc.current.value,
        course: course.slug,
        question: question.current.value,
        content: fileContents,
        answer1: answer1.current.value,
        answer2: answer2.current.value,
        answer3: answer3.current.value,
        answer4: answer4.current.value,
        correct: correctVal,
        unit: unit.current.value,
      }),
    })
    const json = res.status
    switch (json) {
      case 200:
        setError("Success! Lesson requested for review.")
        break
      case 500:
        setError("An unexpected error occured. Please try again later.")
        break
    }
  }
  return (
    <Layout title="Contribute Content" container={false}>
      <header className="bg-white shadow dark:bg-black dark:shadow-white/30">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
            Contribute
          </h1>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <form onSubmit={formSubmit} className="space-y-5">
          <span className="flex space-y-5">
            <InputField
              labelName="Title"
              re={title}
              name="title"
              type="text"
              className="mr-2 inline-block"
            />
            <InputField
              labelName="Heading"
              re={heading}
              name="heading"
              type="text"
              className="ml-2 inline-block"
            />
          </span>
          <InputField
            labelName="Description"
            re={desc}
            name="desc"
            type="text"
          />
          <span className="relative block w-full rounded-md px-1.5 py-1 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:text-gray-50 dark:placeholder-other-400 sm:text-sm">
            <label
              htmlFor="content"
              className="flex flex-auto cursor-pointer items-center text-sm text-gray-500 dark:text-other-400"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 shadow-md dark:bg-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 stroke-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </span>
              <p className="ml-2 inline-block h-full text-base">{content}</p>
            </label>
            <input
              accept="text/markdown,.md"
              ref={contentValue}
              onChange={(e) => setContent(e.target.files[0]?.name)}
              id="content"
              name="content"
              type="file"
              required
              hidden
            />
          </span>
          <InputField
            labelName="Question"
            re={question}
            name="question"
            type="text"
          />
          <span className="block space-y-2 rounded-xl bg-white p-2 shadow-md dark:bg-black">
            <h1 className="block p-0.5 text-sm text-gray-500 dark:text-other-400">
              Answer Choices (Select Correct Answer)
            </h1>
            <span className="grid grid-cols-2 grid-rows-2 gap-2">
              <span className="relative inline-flex flex-grow flex-row rounded-md border border-gray-200 bg-white p-1 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-other-700 dark:bg-black dark:text-gray-50 dark:placeholder-other-400 sm:text-sm">
                <input
                  onChange={(e) => setCorrect(e.target.value)}
                  required
                  type="radio"
                  value="answer1"
                  name="correct"
                  className="mt-[3px] mr-2 h-4 w-4 align-middle invalid:border-red focus:outline-none focus:ring-transparent dark:bg-black dark:invalid:border-red-500"
                />
                <input
                  ref={answer1}
                  required
                  id="answer1"
                  className="relative inline-block w-full appearance-none rounded-md px-1 align-baseline text-gray-900 placeholder-gray-500 outline-none dark:bg-black dark:text-gray-50 dark:placeholder-other-400"
                  placeholder="Answer Choice 1"
                />
              </span>
              <span className="relative inline-flex flex-grow flex-row rounded-md border border-gray-200 bg-white p-1 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-other-700 dark:bg-black dark:text-gray-50 dark:placeholder-other-400 sm:text-sm">
                <input
                  onChange={(e) => setCorrect(e.target.value)}
                  required
                  type="radio"
                  value="answer2"
                  name="correct"
                  className="mt-[3px] mr-2 h-4 w-4 align-middle invalid:border-red focus:outline-none focus:ring-transparent dark:bg-black dark:invalid:border-red-500"
                />
                <input
                  ref={answer2}
                  required
                  id="answer2"
                  className="relative inline-block w-full appearance-none rounded-md px-1 align-baseline text-gray-900 placeholder-gray-500 outline-none dark:bg-black dark:text-gray-50 dark:placeholder-other-400"
                  placeholder="Answer Choice 2"
                />
              </span>
              <span className="relative inline-flex flex-grow flex-row rounded-md border border-gray-200 bg-white p-1 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-other-700 dark:bg-black dark:text-gray-50 dark:placeholder-other-400 sm:text-sm">
                <input
                  onChange={(e) => setCorrect(e.target.value)}
                  required
                  type="radio"
                  value="answer3"
                  name="correct"
                  className="mt-[3px] mr-2 h-4 w-4 align-middle invalid:border-red focus:outline-none focus:ring-transparent dark:bg-black dark:invalid:border-red-500"
                />
                <input
                  ref={answer3}
                  required
                  id="answer3"
                  className="relative inline-block w-full appearance-none rounded-md px-1 align-baseline text-gray-900 placeholder-gray-500 outline-none dark:bg-black dark:text-gray-50 dark:placeholder-other-400"
                  placeholder="Answer Choice 3"
                />
              </span>
              <span className="relative inline-flex flex-grow flex-row rounded-md border border-gray-200 bg-white p-1 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-other-700 dark:bg-black dark:text-gray-50 dark:placeholder-other-400 sm:text-sm">
                <input
                  onChange={(e) => setCorrect(e.target.value)}
                  required
                  type="radio"
                  value="answer4"
                  name="correct"
                  className="mt-[3px] mr-2 h-4 w-4 align-middle invalid:border-red focus:outline-none focus:ring-transparent dark:bg-black dark:invalid:border-red-500"
                />
                <input
                  ref={answer4}
                  required
                  id="answer4"
                  className="relative inline-block w-full appearance-none rounded-md px-1 align-baseline text-gray-900 placeholder-gray-500 outline-none dark:bg-black dark:text-gray-50 dark:placeholder-other-400"
                  placeholder="Answer Choice 4"
                />
              </span>
            </span>
          </span>
          <div className="flex items-center gap-2">
            <Listbox value={course} onChange={setCourse}>
              <div className="relative w-1/2">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 dark:bg-black sm:text-sm">
                  <span className="block truncate text-gray-500 dark:text-other-400">
                    {course.name}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400 dark:text-other-500"
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-black dark:ring-other-700 sm:text-sm">
                    {courses.map((courseMap, courseIdx) => (
                      <Listbox.Option
                        key={courseIdx}
                        value={courseMap}
                        className={({ active }) =>
                          `${
                            active
                              ? "bg-blue-300 text-black"
                              : "text-gray-900 dark:text-gray-50"
                          }
                                              relative cursor-default select-none py-2 pl-10 pr-4`
                        }
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`${
                                selected ? "font-medium" : "font-normal"
                              } block truncate`}
                            >
                              {courseMap.name}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 text-gray-900 dark:text-gray-50`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
            <InputField
              labelName="Unit Name"
              re={unit}
              name="unit"
              type="text"
              className="w-1/2"
            />
          </div>
          <button type="submit" className="block">
            Submit
          </button>
          <p>{error}</p>
        </form>
      </div>
    </Layout>
  )
}
