/* eslint-disable @next/next/no-img-element */
import Layout from "../../components/layout"
import { useAuth } from "../../components/userContext"
import { auth, storage } from "../../components/clientApp"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { FormEvent, useEffect, useRef, useState } from "react"
import { updateEmail, updatePassword } from "@firebase/auth"
import { fetchData } from "../../components/utils"

export default function EditAccount() {
  const image = useRef(null)
  const username = useRef(null)
  const email = useRef(null)
  const password = useRef(null)
  const [user, dispatch] = useAuth()
  const [tempImage, setTemp] = useState(user.profileUrl)
  useEffect(() => {
    setTemp(user.profileUrl)
  }, [user.profileUrl])
  const imageRead = (e) => {
    let reader = new FileReader()
    reader.onloadend = () => {
      setTemp(reader.result as string)
    }
    reader.readAsDataURL(e.target.files[0])
  }
  const changeCreds = async (e: FormEvent) => {
    e.preventDefault()
    if (image.current.files.length > 0) {
      const storageRef = ref(storage, `images/${user.username}`)
      uploadBytes(storageRef, image.current.files[0]).then((snapshot) => {
        getDownloadURL(storageRef).then(async (url) => {
          await fetchData("/api/user/updateuser", {
            method: "PATCH",
            body: JSON.stringify({
              uid: user.uid,
              field: "profileUrl",
              update: url,
            }),
          })
          dispatch()
          setTemp(user.profileUrl)
        })
      })
    }
    if (
      username.current.value !== user.username &&
      username.current.value !== "" &&
      !username.current.value.includes(" ")
    ) {
      await fetchData("/api/user/updateuser", {
        method: "PATCH",
        body: JSON.stringify({
          uid: user.uid,
          field: "username",
          update: username.current.value,
        }),
      })
      dispatch()
    }
    if (
      email.current.value !== auth.currentUser.email &&
      email.current.value !== "" &&
      !email.current.value.includes(" ")
    ) {
      updateEmail(auth.currentUser, email.current.value).then(async () => {
        await auth.currentUser.getIdToken(true)
      })
    }
    if (
      password.current.value !== "" &&
      !password.current.value.includes(" ")
    ) {
      updatePassword(auth.currentUser, password.current.value).then(
        async () => {
          await auth.currentUser.getIdToken(true)
        },
      )
    }
  }
  return (
    <Layout title="Edit Profile">
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200 dark:border-other-700"></div>
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-50">
                Personal Information
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300"></p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form onSubmit={(e) => changeCreds(e)}>
              <div className="overflow-hidden shadow dark:shadow-white/20 sm:rounded-md">
                <div className="bg-white px-4 py-5 dark:bg-black sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Username
                      </label>
                      <input
                        ref={username}
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="username"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-other-600 dark:bg-black dark:shadow-white/10 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Email address
                      </label>
                      <input
                        ref={email}
                        type="text"
                        name="email-address"
                        id="email-address"
                        autoComplete="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-other-600 dark:bg-black dark:shadow-white/10 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Password
                      </label>
                      <input
                        ref={password}
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-other-600 dark:bg-black dark:shadow-white/10 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Photo
                    </label>
                    <div className="mt-1 flex items-center">
                      <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100 dark:bg-other-800">
                        {user.profileUrl ? (
                          <img
                            className="h-full w-full text-gray-300"
                            src={tempImage}
                            alt="User profile"
                          />
                        ) : (
                          <img
                            className="h-full w-full text-gray-300"
                            src="/avatar.svg"
                            alt="User profile"
                          />
                        )}
                      </span>
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <span className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-other-600 dark:bg-black dark:text-gray-200 dark:shadow-white/10">
                          Change
                        </span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          ref={image}
                          onChange={imageRead}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right dark:bg-other-900 sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:shadow-white/10"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200 dark:border-other-700"></div>
        </div>
      </div>
    </Layout>
  )
}
