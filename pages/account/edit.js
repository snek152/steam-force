import Layout from "../../components/layout"
import { useAuth } from "../../components/userContext"
import db, { auth, storage } from "../../components/clientApp"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { doc, updateDoc } from "@firebase/firestore"
import { useEffect, useRef, useState } from "react"
import { updateEmail, updatePassword } from "@firebase/auth"

export default function EditAccount() {
    const image = useRef(null)
    const username = useRef(null)
    const email = useRef(null)
    const password = useRef(null)
    const user = useAuth()
    const [tempImage, setTemp] = useState(user.profileUrl)
    useEffect(() => {
        setTemp(user.profileUrl)
    }, [user.profileUrl])
    const imageRead = (e) => {
        let reader = new FileReader()
        reader.onloadend = () => {
            setTemp(reader.result)
        }
        reader.readAsDataURL(e.target.files[0])
    }
    const changeCreds = async (e) => {
        e.preventDefault()
        if (image.current.files.length > 0) {
            const storageRef = ref(storage, `images/${user.username}`)
            uploadBytes(storageRef, image.current.files[0]).then((snapshot) => {
                getDownloadURL(storageRef).then(async (url) => {
                    await updateDoc(doc(db, "users", user.uid), {
                        profileUrl: url
                    })
                    await auth.currentUser.getIdToken(true)
                    setTemp(user.profileUrl)
                })
            })
        }
        if (username.current.value !== user.username && username.current.value !== "" && !username.current.value.includes(" ")) {
            await updateDoc(doc(db, "users", user.uid), {
                username: username.current.value
            })
            await auth.currentUser.getIdToken(true)
        }
        if (email.current.value !== auth.currentUser.email && email.current.value !== "" && !email.current.value.includes(" ")) {
            updateEmail(auth.currentUser, email.current.value).then(() => {
                console.log("testing updated!!!!!")
            })
            await auth.currentUser.getIdToken(true)
        }
        if (password.current.value !== "" && !password.current.value.includes(" ")) {
            updatePassword(auth.currentUser, password.current.value).then(() => {
                console.log("password updated!!!!!")
            })
            await auth.currentUser.getIdToken(true)
        }
    }
    return <Layout title="Edit Profile">
        <div>
            <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
                        <p className="mt-1 text-sm text-gray-600">
                            This information will be displayed publicly so be careful what you share.
                        </p>
                    </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <form action="#" method="POST">
                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="col-span-3 sm:col-span-2">
                                        <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                            Website
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                                http://
                                            </span>
                                            <input type="text" name="company-website" id="company-website" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="www.example.com" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                        About
                                    </label>
                                    <div className="mt-1">
                                        <textarea id="about" name="about" rows="3" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="you@example.com"></textarea>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Brief description for your profile. URLs are hyperlinked.
                                    </p>
                                </div>




                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
                <div className="border-t border-gray-200"></div>
            </div>
        </div>

        <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                        <p className="mt-1 text-sm text-gray-600">
                            Use a permanent address where you can receive mail.
                        </p>
                    </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <form onSubmit={e => changeCreds(e)}>
                        <div className="shadow overflow-hidden sm:rounded-md">
                            <div className="px-4 py-5 bg-white sm:p-6">
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">Username</label>
                                        <input ref={username} type="text" name="first-name" id="first-name" autoComplete="username" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">Email address</label>
                                        <input ref={email} type="text" name="email-address" id="email-address" autoComplete="email" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                        <input ref={password} type="password" name="password" id="password" autoComplete="email" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>

                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Photo
                                    </label>
                                    <div className="mt-1 flex items-center">
                                        <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                            {user.profileUrl ? <img className="h-full w-full text-gray-300" src={tempImage} alt="" /> : <img className="h-full w-full text-gray-300" src="/avatar.svg" alt="" />}
                                        </span>
                                        <label htmlFor="file-upload" className="cursor-pointer">
                                            <span className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                Change
                                            </span>
                                            <input id="file-upload" name="file-upload" type="file" accept="image/*" className="sr-only" ref={image} onChange={imageRead}/>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
                <div className="border-t border-gray-200"></div>
            </div>
        </div>
    </Layout>
}