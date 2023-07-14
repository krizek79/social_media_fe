import React, {Fragment, useRef, useState} from "react"
import {Dialog, Transition} from "@headlessui/react"

export default function EditProfileDialog(props) {

    const [isOpen, setIsOpen] = useState(false)
    const textareaRef = useRef(null)
    const [request, setRequest] = useState({
        email: props.profileData.email,
        username: props.profileData.username,
        bio: props.profileData.bio,
        avatarUrl: props.profileData.avatarUrl
    })
    const [fieldErrors, setFieldErrors] = useState({
        email: "",
        username: ""
    })

    function validateField(name, value) {
        let error = ""

        switch (name) {
            case "email":
                if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                    error = "Invalid email format"
                }
                if (value.length === 0) {
                    error = "Email is required"
                }
                break
            case "username":
                if (value.length === 0) {
                    error = "Username is required"
                }
                break
            default:
                break
        }

        setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: error }))
    }


    function handleChange(e) {
        const { name, value } = e.target
        setRequest({ ...request, [name]: value })
        validateField(name, value)
    }

    function toggleDialog() {
        setIsOpen(!isOpen)
    }

    function handleTextareaResize() {
        const textarea = textareaRef.current
        textarea.style.height = "auto"
        textarea.style.height = `${textarea.scrollHeight}px`
    }

    return (
        <>
            <button
                className="hover:text-violet-500"
                onClick={toggleDialog}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
            </button>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={toggleDialog}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-75"/>
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto px-3">
                        <div className="flex min-h-full items-center justify-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className="transform overflow-hidden transition-all w-full p-6 bg-[#F6F6F6]
                                    rounded-md shadow-md md:max-w-2xl"
                                >
                                    <div className="flex justify-between items-end pb-3 border-b">
                                        <Dialog.Title className="text-lg font-medium self-end text-[#0F044C]">
                                            Edit profile
                                        </Dialog.Title>
                                    </div>
                                    <form className="flex flex-col gap-y-6 mt-3">
                                        <div className="flex flex-col md:flex-row">
                                            <div className="flex w-full md:w-3/5 justify-center items-center">
                                                <img
                                                    src={props.profileData.avatarUrl}
                                                    alt="Profile picture"
                                                    className="rounded-full object-scale-down h-32 w-32
                                                    hover:cursor-pointer hover:grayscale-[50%] duration-200"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-y-3 w-full">
                                                <div>
                                                    <label
                                                        htmlFor="email"
                                                        className="text-sm font-semibold text-gray-800"
                                                    >
                                                        Email
                                                    </label>
                                                    <input
                                                        id={"email"}
                                                        type={"email"}
                                                        name={"email"}
                                                        value={request.email}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-2 mt-2 bg-white border rounded-md
                                                        focus:border-[#0F044C] focus:ring-[#141E61] focus:outline-none
                                                        focus:ring focus:ring-opacity-40"
                                                    />
                                                    {fieldErrors.email && (
                                                        <span className="text-red-500 text-sm">
                                                            {fieldErrors.email}
                                                        </span>
                                                    )}
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="username"
                                                        className="text-sm font-semibold text-gray-800"
                                                    >
                                                        Username
                                                    </label>
                                                    <input
                                                        id={"username"}
                                                        name={"username"}
                                                        value={request.username}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-2 mt-2 bg-white border rounded-md
                                                        focus:border-[#0F044C] focus:ring-[#141E61] focus:outline-none
                                                        focus:ring focus:ring-opacity-40"
                                                    />
                                                    {fieldErrors.username && (
                                                        <span className="text-red-500 text-sm">
                                                            {fieldErrors.username}
                                                        </span>
                                                    )}
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="bio"
                                                        className="text-sm font-semibold text-gray-800"
                                                    >
                                                        Bio
                                                    </label>
                                                    <textarea
                                                        id="bio"
                                                        rows="3"
                                                        ref={textareaRef}
                                                        name="bio"
                                                        value={request.bio ? request.bio : ""}
                                                        className="mb-2 block w-full px-4 py-2 mt-2 text-black bg-white
                                                        border rounded-md overflow-y-hidden focus:border-[#0F044C]
                                                        focus:ring-[#141E61] focus:outline-none focus:ring
                                                        focus:ring-opacity-40"
                                                        onChange={(e) => {
                                                            handleChange(e)
                                                            handleTextareaResize()
                                                        }}
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            className="w-full py-2 tracking-wide text-white duration-200
                                            bg-[#141E61] rounded-md hover:bg-[#0F044C] focus:outline-none
                                            focus:bg-[#0F044C]"
                                        >
                                            Submit
                                        </button>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}