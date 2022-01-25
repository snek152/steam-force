import Layout from "../../components/layout"
import { useRef, useState, Fragment } from "react"
import { Listbox, Transition } from "@headlessui/react"

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
  const [error, setError] = useState("Submit")
  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        resolve(reader.result)
      }
      reader.onerror = reject
      reader.readAsText(file, "UTF-8")
    })
  }
  const formSubmit = async (e) => {
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
    const res = await fetch(
      `${
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://steam-force.vercel.app"
      }/api/addcourse`,
      {
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
      },
    )
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
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Contribute</h1>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
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
          <span className="rounded-md relative block w-full px-1.5 py-1 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm">
            <label
              htmlFor="content"
              className="text-gray-500 text-sm cursor-pointer flex flex-auto items-center"
            >
              <span className="shadow-md rounded-lg bg-blue-500 h-10 inline-flex items-center justify-center w-10">
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
              <p className="inline-block text-base ml-2 h-full">{content}</p>
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
          <span className="space-y-2 bg-white p-2 shadow-md block rounded-xl">
            <h1 className="text-base block">
              Answer Choices (Select Correct Answer)
            </h1>
            <span className="grid grid-cols-2 grid-rows-2 gap-2">
              <span className="bg-white inline-flex flex-row flex-grow p-1 rounded-md relative px-3 py-2 border border-gray-200 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm">
                <input
                  onChange={(e) => setCorrect(e.target.value)}
                  required
                  type="radio"
                  value="answer1"
                  name="correct"
                  className="invalid:border-red h-4 w-4 focus:outline-none focus:ring-transparent align-middle mt-[3px] mr-2"
                />
                <input
                  ref={answer1}
                  required
                  id="answer1"
                  className="inline-block align-baseline text-gray-500 appearance-none rounded-md w-full relative px-1 placeholder-gray-500"
                  placeholder="Answer Choice 1"
                />
              </span>
              <span className="bg-white inline-flex flex-row flex-grow p-1 rounded-md relative px-3 py-2 border border-gray-200 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm">
                <input
                  onChange={(e) => setCorrect(e.target.value)}
                  required
                  type="radio"
                  value="answer2"
                  name="correct"
                  className="invalid:border-red h-4 w-4 focus:outline-none focus:ring-transparent align-middle mt-[3px] mr-2"
                />
                <input
                  ref={answer2}
                  required
                  id="answer2"
                  className="inline-block align-baseline text-gray-500 appearance-none rounded-md w-full relative px-1 placeholder-gray-500"
                  placeholder="Answer Choice 2"
                />
              </span>
              <span className="bg-white inline-flex flex-row flex-grow p-1 rounded-md relative px-3 py-2 border border-gray-200 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm">
                <input
                  onChange={(e) => setCorrect(e.target.value)}
                  required
                  type="radio"
                  value="answer3"
                  name="correct"
                  className="invalid:border-red h-4 w-4 focus:outline-none focus:ring-transparent align-middle mt-[3px] mr-2"
                />
                <input
                  ref={answer3}
                  required
                  id="answer3"
                  className="inline-block align-baseline text-gray-500 appearance-none rounded-md w-full relative px-1 placeholder-gray-500"
                  placeholder="Answer Choice 3"
                />
              </span>
              <span className="bg-white inline-flex flex-row flex-grow p-1 rounded-md relative px-3 py-2 border border-gray-200 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm">
                <input
                  onChange={(e) => setCorrect(e.target.value)}
                  required
                  type="radio"
                  value="answer4"
                  name="correct"
                  className="invalid:border-red h-4 w-4 focus:outline-none focus:ring-transparent align-middle mt-[3px] mr-2"
                />
                <input
                  ref={answer4}
                  required
                  id="answer4"
                  className="inline-block align-baseline text-gray-500 appearance-none rounded-md w-full relative px-1 placeholder-gray-500"
                  placeholder="Answer Choice 4"
                />
              </span>
            </span>
          </span>
          <div className="flex items-center gap-2">
            <Listbox value={course} onChange={setCourse}>
              <div className="relative w-1/2">
                <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                  <span className="block truncate text-gray-500">
                    {course.name}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
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
                  <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {courses.map((courseMap, courseIdx) => (
                      <Listbox.Option
                        key={courseIdx}
                        value={courseMap}
                        className={({ active }) =>
                          `${
                            active ? "text-black bg-blue-300" : "text-gray-900"
                          }
                                              cursor-default select-none relative py-2 pl-10 pr-4`
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
                                className={`text-gray-900 absolute inset-y-0 left-0 flex items-center pl-3`}
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

function InputField({ labelName, re, name, type, className }) {
  return (
    <>
      <label htmlFor={name} className="sr-only">
        {labelName}
      </label>
      <input
        ref={re}
        id={name}
        name={name}
        type={type}
        required
        className={`${className} appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-100 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm shadow-md`}
        placeholder={labelName}
      />
    </>
  )
}
