import React, {Fragment, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import authService from "../../api/AuthenticationApi.js";
import {useNavigate} from "react-router-dom";
import ErrorNotification from "../util/ErrorNotification.jsx";

export default function RegistrationDialog() {

    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [apiError, setApiError] = useState(null)
    const [request, setRequest] = useState({
        email: "",
        username: "",
        password: "",
        matchingPassword: ""
    })
    const [fieldErrors, setFieldErrors] = useState({
        email: "",
        username: "",
        password: "",
        matchingPassword: ""
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
            case "password":
                if (value.length === 0) {
                    error = "Password is required"
                }
                break
            case "matchingPassword":
                if (value !== request.password) {
                    error = "Passwords do not match"
                }
                if (value.length === 0) {
                    error = "Matching password is required"
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

    function handleSubmit(e) {
        e.preventDefault()
        register()
    }

    function register() {
        setApiError(null)
        return authService.register(request)
            .then(response => {
                if (response.status === 200) {
                    toggleDialog()
                    navigate("/registration-successful")
                }
            })
            .catch(e => {
                if (e.response?.data?.message) {
                    setApiError(e.response.data.message)
                } else {
                    console.log(e)
                }
            })
    }

    function toggleDialog() {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <button
                className="w-full py-2 tracking-wide text-[#141E61] duration-200 bg-[#F6F6F6] border border-[#141E61]
                rounded-md hover:bg-gray-200 focus:outline-none"
                onClick={toggleDialog}
            >
                Create new account
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
                                    rounded-md shadow-md md:max-w-xl"
                                >
                                    <div className="flex justify-between items-end pb-3 border-b">
                                        <Dialog.Title className="text-lg font-medium self-end text-[#0F044C]">
                                            Create new account
                                        </Dialog.Title>
                                    </div>
                                    <form className="flex flex-col gap-y-2 mt-3" onSubmit={handleSubmit}>
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
                                                <span className="text-red-500 text-sm">{fieldErrors.email}</span>
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
                                                <span className="text-red-500 text-sm">{fieldErrors.username}</span>
                                            )}
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="password"
                                                className="text-sm font-semibold text-gray-800"
                                            >
                                                Password
                                            </label>
                                            <input
                                                id={"password"}
                                                type={"password"}
                                                name={"password"}
                                                value={request.password}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 mt-2 bg-white border rounded-md
                                                focus:border-[#0F044C] focus:ring-[#141E61] focus:outline-none
                                                focus:ring focus:ring-opacity-40"
                                            />
                                            {fieldErrors.password && (
                                                <span className="text-red-500 text-sm">{fieldErrors.password}</span>
                                            )}
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="matchingPassword"
                                                className="text-sm font-semibold text-gray-800"
                                            >
                                                Repeat password
                                            </label>
                                            <input
                                                id={"matchingPassword"}
                                                type={"password"}
                                                name={"matchingPassword"}
                                                value={request.matchingPassword}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 mt-2 bg-white border rounded-md
                                                focus:border-[#0F044C] focus:ring-[#141E61] focus:outline-none
                                                focus:ring focus:ring-opacity-40"
                                            />
                                            {fieldErrors.matchingPassword && (
                                                <span className="text-red-500 text-sm">
                                                    {fieldErrors.matchingPassword}
                                                </span>
                                            )}
                                        </div>
                                        {apiError && (
                                            <div className="mt-6">
                                                <ErrorNotification message={apiError} setApiError={setApiError}/>
                                            </div>
                                        )}
                                        <div className="mt-6">
                                            <button
                                                className="w-full py-2 tracking-wide text-white duration-200
                                                bg-[#141E61] rounded-md hover:bg-[#0F044C] focus:outline-none
                                                focus:bg-[#0F044C]"
                                            >
                                                Submit
                                            </button>
                                        </div>
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