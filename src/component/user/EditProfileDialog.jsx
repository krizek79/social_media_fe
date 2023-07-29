import React, {Fragment, useContext, useRef, useState} from "react"
import {Dialog, Transition} from "@headlessui/react"
import appUserApi from "../../api/AppUserApi.js"
import {AuthContext} from "../security/AuthContext.js"

export default function EditProfileDialog(props) {

    const { logout } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)
    const textareaRef = useRef(null)
    const [request, setRequest] = useState({
        username: props.profileData.username,
        bio: props.profileData.bio,
        avatarUrl: props.profileData.avatarUrl
    })

    function handleChange(e) {
        const { name, value } = e.target
        setRequest({ ...request, [name]: value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        updateUser()
    }

    function updateUser() {
        appUserApi.updateAppUser(props.profileData.id, request)
            .then(response => {
                if (response.status === 200) {
                    toggleDialog()
                    location.reload()
                }
            })
            .catch(error => {
                if (error.response.status === 401) {
                    logout()
                }
                console.log(error.response.status + ": " + error.response.data.message)
            })
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
                className="border-2 border-black py-1.5 px-6 rounded-lg text-black hover:bg-gray-200"
                onClick={toggleDialog}
            >
                Edit profile
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
                                    <form className="flex flex-col gap-y-6 mt-3" onSubmit={handleSubmit}>
                                        <div className="flex flex-col md:flex-row">
                                            <div className="flex w-full md:w-3/5 justify-center items-center">
                                                <img
                                                    src={request.avatarUrl}
                                                    alt="Profile picture"
                                                    className="rounded-full object-scale-down h-32 w-32
                                                    hover:cursor-pointer hover:grayscale-[50%] duration-200"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-y-3 w-full">
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