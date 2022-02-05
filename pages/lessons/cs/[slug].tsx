import { getPostBySlug, getAllPosts } from "../../../lib/courses"
import markdownToHtml from "../../../lib/markdown"
import matter from "gray-matter"
import Layout from "../../../components/layout"
import fs from "fs"
import { join } from "path"
import Link from "next/link"
import { FormEvent, useEffect } from "react"
import { useRouter } from "next/router"
import { useAuth } from "../../../components/userContext"
import { fetchData, LessonProps } from "../../../lib/utils"
import { GetStaticPaths, GetStaticProps } from "next"
import dynamic from "next/dynamic"

const Sidebar = dynamic(() => import("../../../components/sidebar"))
const AccountHeader = dynamic(() => import("../../../components/accountHeader"))

export default function CSLesson(props: LessonProps) {
  const router = useRouter()
  const [user, dispatch] = useAuth()
  const answerchoices = [...props.data.answerchoices]

  const formSubmit = async (e: FormEvent) => {
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
      await fetchData("/api/user/updateuser", {
        method: "PATCH",
        body: JSON.stringify({
          uid: user.uid,
          field: "points",
          update: "increment",
          args: [10],
          method: true,
        }),
      })
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
      await fetchData("/api/user/updateuser", {
        method: "PATCH",
        body: JSON.stringify({
          uid: user.uid,
          field: "points",
          update: "increment",
          args: [1],
          method: true,
        }),
      })
    }
    await fetchData("/api/user/updateuser", {
      method: "PATCH",
      body: JSON.stringify({
        uid: user.uid,
        field: "completed",
        update: "arrayUnion",
        args: [props.data.slug],
        method: true,
      }),
    })
    dispatch()
  }
  useEffect(() => {
    const fn = async () => {
      try {
        await Promise.all([
          fetchData("/api/user/updateuser", {
            method: "PATCH",
            body: JSON.stringify({
              uid: user.uid,
              field: "current",
              update: router.asPath,
            }),
          }),
          fetchData("/api/user/updateuser", {
            method: "PATCH",
            body: JSON.stringify({
              uid: user.uid,
              field: "currentTitle",
              update: props.data.heading,
            }),
          }),
          fetchData("/api/user/updateuser", {
            method: "PATCH",
            body: JSON.stringify({
              uid: user.uid,
              field: "courses.cs",
              update: props.data.slug,
            }),
          }),
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
      <AccountHeader searches={props.searches} />
      <div className="relative mx-auto flex max-w-7xl flex-grow flex-col py-6 px-4 sm:flex-row sm:px-6 lg:px-8">
        <Sidebar
          lessons={props.lessons}
          type="cs"
          currentTitle={props.data.title}
        />
        <div className="prose inline-block w-full max-w-none rounded-2xl border border-opacity-80 bg-white p-4 shadow-lg prose-h2:border-t-2 prose-h2:pt-5 prose-pre:p-0 dark:prose-invert dark:bg-black sm:w-9/12">
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
              className={`relative mb-5 rounded-md bg-gray-50 p-3 shadow-md dark:bg-other-900 ${
                user.completed?.includes(props.data.slug) || user.offline
                  ? "pointer-events-none cursor-not-allowed bg-white text-gray-400 dark:bg-black dark:text-other-500"
                  : ""
              }`}
            >
              {user.offline && (
                <span className="absolute grid h-full w-full -translate-x-3 -translate-y-3 place-items-center object-contain text-5xl font-medium text-gray-500 dark:text-other-500">
                  Offline
                </span>
              )}
              <span className="text-lg font-semibold">
                Review: {props.data.question}
              </span>
              <form onSubmit={formSubmit}>
                {answerchoices.map((choice) => (
                  <span
                    className={`m-1 flex flex-grow flex-row rounded-lg p-1 ${
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
                      className="mt-[6px] mr-2 h-4 w-4 align-middle focus:outline-none focus:ring-transparent dark:border-gray-50 dark:bg-other-900"
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
                  className={`rounded-md py-1 px-2 text-white shadow-lg dark:text-black ${
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
          <div className="flex h-10 justify-between">
            <Link href={`/lessons/cs/${props.data.prev}`}>
              <a
                className={`rounded-md bg-gray-300 px-3 pt-[0.4rem] font-normal no-underline shadow-md dark:bg-gray-500 ${
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
                className={`rounded-md bg-blue-500 px-3 pt-[0.4rem] font-normal text-white no-underline shadow-md ${
                  props.data.next
                    ? ""
                    : "pointer-events-none bg-blue-300 text-gray-100 dark:bg-blue-400"
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
  const postMap = (
    type: string,
  ): { title: string; slug: string; type: string; desc: string }[] => {
    return getAllPosts(type).map((value) => {
      return {
        title: value.title,
        slug: value.slug,
        type: type,
        desc: value.desc,
      }
    })
  }
  return {
    props: {
      content: cont,
      data: data,
      lessons: {
        cs: getAllPosts("cs"),
        math: getAllPosts("math"),
        science: getAllPosts("science"),
      },
      searches: [...postMap("cs"), ...postMap("math"), ...postMap("science")],
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = fs.readdirSync(join(process.cwd(), "courses/cs"))
  const posts = slugs.slice(0, 100).map((slug) => {
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
    fallback: "blocking",
  }
}
