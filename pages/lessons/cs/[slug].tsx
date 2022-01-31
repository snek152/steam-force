import { getPostBySlug, getAllPosts } from "../../../components/courses"
import markdownToHtml from "../../../components/markdown"
import matter from "gray-matter"
import Layout from "../../../components/layout"
// import Sidebar from "../../../components/sidebar"
import fs from "fs"
import { join } from "path"
// import AccountHeader from "../../../components/accountHeader"
import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { useAuth } from "../../../components/userContext"
import { LessonProps } from "../../../components/utils"
import { GetStaticPaths, GetStaticProps } from "next"
import dynamic from "next/dynamic"

const Sidebar = dynamic(() => import("../../../components/sidebar"))
const AccountHeader = dynamic(() => import("../../../components/accountHeader"))

export default function CSLesson(props: LessonProps) {
  const router = useRouter()
  const user = useAuth()
  const answerchoices = [...props.data.answerchoices]
  const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  }
  shuffleArray(answerchoices)
  const formSubmit = async (e) => {
    e.preventDefault()
    const val = document.querySelector(
      `input[name=${props.data.slug}-question]:checked + label`,
    ).innerHTML
    if (val == props.data.correct) {
      document
        .querySelector(`input[name=${props.data.slug}-question]:checked`)
        .parentElement.classList.add("bggreen")
      document
        .querySelector(`input[name=${props.data.slug}-question]:checked`)
        .classList.add("bggreen")
      await fetch(
        `${
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : "https://steam-force.vercel.app"
        }/api/user/updateuser`,
        {
          method: "PATCH",
          body: JSON.stringify({
            uid: user.uid,
            field: "points",
            update: "increment",
            args: [10],
            method: true,
          }),
        },
      )
    } else {
      document
        .querySelector(`input[name=${props.data.slug}-question]:checked`)
        .parentElement.classList.add("bgred")
      document
        .querySelectorAll(`input[name=${props.data.slug}-question] + label`)
        .forEach((element: HTMLElement) => {
          if (element.innerText == props.data.correct) {
            element.parentElement.classList.add("bggreen")
          }
        })
      await fetch(
        `${
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : "https://steam-force.vercel.app"
        }/api/user/updateuser`,
        {
          method: "PATCH",
          body: JSON.stringify({
            uid: user.uid,
            field: "points",
            update: "increment",
            args: [1],
            method: true,
          }),
        },
      )
    }
    await fetch(
      `${
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://steam-force.vercel.app"
      }/api/user/updateuser`,
      {
        method: "PATCH",
        body: JSON.stringify({
          uid: user.uid,
          field: "completed",
          update: "arrayUnion",
          args: [props.data.slug],
          method: true,
        }),
      },
    )
    router.reload()
  }
  useEffect(() => {
    const fn = async () => {
      try {
        await Promise.all([
          fetch(
            `${
              process.env.NODE_ENV === "development"
                ? "http://localhost:3000"
                : "https://steam-force.vercel.app"
            }/api/user/updateuser`,
            {
              method: "PATCH",
              body: JSON.stringify({
                uid: user.uid,
                field: "current",
                update: router.asPath,
              }),
            },
          ),
          fetch(
            `${
              process.env.NODE_ENV === "development"
                ? "http://localhost:3000"
                : "https://steam-force.vercel.app"
            }/api/user/updateuser`,
            {
              method: "PATCH",
              body: JSON.stringify({
                uid: user.uid,
                field: "currentTitle",
                update: props.data.heading,
              }),
            },
          ),
          fetch(
            `${
              process.env.NODE_ENV === "development"
                ? "http://localhost:3000"
                : "https://steam-force.vercel.app"
            }/api/user/updateuser`,
            {
              method: "PATCH",
              body: JSON.stringify({
                uid: user.uid,
                field: "courses.cs",
                update: props.data.slug,
              }),
            },
          ),
        ])
      } catch (e) {}
    }
    fn()
  }, [
    props.data.heading,
    props.data.slug,
    router.asPath,
    user.courses?.math,
    user.courses?.science,
    user?.uid,
  ])
  return (
    <Layout title={props.data.title} container={false}>
      <AccountHeader />
      <div className="flex max-w-7xl sm:flex-row flex-col mx-auto py-6 px-4 sm:px-6 lg:px-8 relative flex-grow">
        <Sidebar
          lessons={props.lessons}
          type="cs"
          currentTitle={props.data.title}
        />
        <div className="w-full inline-block prose dark:prose-invert prose-pre:p-0 prose-h2:border-t-2 prose-h2:pt-5 border p-4 shadow-lg rounded-2xl border-opacity-80 bg-white dark:bg-black max-w-none sm:w-9/12">
          <h1>{props.data.heading}</h1>
          <p className="mb-0">In this section you will {props.data.desc}.</p>
          <div dangerouslySetInnerHTML={{ __html: props.content }}></div>
          <div
            className={
              user.completed?.includes(props.data.slug) || user.offline
                ? "cursor-not-allowed"
                : ""
            }
          >
            <div
              className={`bg-gray-50 dark:bg-other-900 shadow-md rounded-md p-3 relative mb-5 ${
                user.completed?.includes(props.data.slug) || user.offline
                  ? "bg-white dark:bg-black text-gray-400 dark:text-other-500 cursor-not-allowed pointer-events-none"
                  : ""
              }`}
            >
              {user.offline && (
                <span className="absolute -translate-x-3 -translate-y-3 grid font-medium place-items-center text-gray-500 text-5xl dark:text-other-500 w-full h-full object-contain">
                  Offline
                </span>
              )}
              <span className="font-semibold text-lg">
                Review: {props.data.question}
              </span>
              <form onSubmit={formSubmit}>
                {answerchoices.map((choice) => (
                  <span
                    className={`flex flex-row flex-grow m-1 p-1 rounded-lg ${
                      user.completed?.includes(props.data.slug) &&
                      !user.offline &&
                      choice == props.data.correct
                        ? "bggreen"
                        : ""
                    }`}
                    key={choice}
                  >
                    <input
                      type="radio"
                      id={choice}
                      name={`${props.data.slug}-question`}
                      className="h-4 w-4 focus:outline-none dark:bg-other-900 dark:border-gray-50 focus:ring-transparent align-middle mt-[6px] mr-2"
                    />
                    <label
                      className="not-prose inline-block align-baseline"
                      htmlFor={choice}
                    >
                      {choice}
                    </label>
                  </span>
                ))}
                <button
                  type="submit"
                  className={`text-white dark:text-black py-1 px-2 rounded-md shadow-lg ${
                    user.completed?.includes(props.data.slug)
                      ? "bg-blue-200 dark:bg-blue-300"
                      : "bg-blue-500 dark:bg-blue-400"
                  }`}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div className="flex justify-between h-10">
            <Link href={`/lessons/cs/${props.data.prev}`}>
              <a
                className={`bg-gray-300 dark:bg-gray-500 rounded-md shadow-md no-underline pt-[0.4rem] px-3 font-normal ${
                  props.data.prev
                    ? ""
                    : "pointer-events-none bg-gray-200 text-gray-400"
                }`}
              >
                Previous
              </a>
            </Link>
            <Link href={`/lessons/cs/${props.data.next}`}>
              <a
                className={`bg-blue-500 rounded-md shadow-md no-underline text-white pt-[0.4rem] px-3 font-normal ${
                  props.data.next
                    ? ""
                    : "pointer-events-none bg-blue-300 dark:bg-blue-400 text-gray-100"
                }`}
              >
                Next
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const fileContents = getPostBySlug(params.slug as string, "cs")
  const { data, content } = matter(fileContents)
  const cont = await markdownToHtml(content)
  return {
    props: {
      content: cont,
      data: data,
      lessons: {
        cs: getAllPosts("cs"),
        math: getAllPosts("math"),
        science: getAllPosts("science"),
      },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = fs.readdirSync(join(process.cwd(), "courses/cs"))
  const posts = slugs.map((slug) => {
    return { slug: slug.replace(/\.md$/, "") }
  })
  const paths = []
  posts.forEach((post) => {
    paths.push({
      params: {
        slug: post.slug,
      },
    })
  })
  return {
    paths: paths,
    fallback: false,
  }
}
