import React, {useState} from "react"
import RegistrationModal from "./RegistrationModal.jsx"
import authService from "../../service/AuthService.js"
import {useNavigate} from "react-router-dom"
import LoadingModal from "../util/LoadingModal.jsx";
import ErrorNotification from "../util/ErrorNotification.jsx";

export default function Login() {

    const navigate = useNavigate()
    const [registrationModal, setRegistrationModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [loginRequest, setLoginRequest] = useState({
        usernameOrEmail: "",
        password: ""
    })

    function toggleRegistrationModal() {
        setError(null)
        setRegistrationModal(!registrationModal)
    }

    function validateUsernameOrEmail(usernameOrEmail) {
        const usernameOrEmailError = document.getElementById("loginUsernameOrEmailError")
        if (usernameOrEmail.length === 0) {
            usernameOrEmailError.innerHTML = "Please enter your username or email"
            return false
        } else {
            usernameOrEmailError.innerHTML = ""
            return true
        }
    }

    function validatePassword(password) {
        const passwordError = document.getElementById("loginPasswordError")
        if (password.length === 0) {
            passwordError.innerHTML = "Please enter your password"
            return false
        } else {
            passwordError.innerHTML = ""
            return true
        }
    }

    function handleChange(e) {
        if (e.target.name === "usernameOrEmail") {
            validateUsernameOrEmail(e.target.value)
        }
        if (e.target.name === "password") {
            validatePassword(e.target.value)
        }
        setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value })
    }

    function login() {
        setError(null)
        if (!validateUsernameOrEmail(loginRequest.usernameOrEmail) || !validatePassword(loginRequest.password)) {
            return
        }

        setLoading(true)
        authService.login(loginRequest)
            .then(response => {
                if (response.data.authenticationToken) {
                    localStorage.setItem("authenticationToken", response.data.authenticationToken)
                    localStorage.setItem("username", response.data.username)
                    localStorage.setItem("avatarUrl", response.data.avatarUrl)
                    localStorage.setItem("role", response.data.role)
                }
                setLoading(false)
                navigate("/")
            })
            .catch(e => {
                if (e.response.status === 401) {
                    setError("Wrong credentials")
                } else {
                    console.log(e.response.status + ": " + e.response.data.message)
                    setError(e.response.data.message)
                }
                setLoading(false)
            })
    }

    return (
        <main className="bg-gradient-to-b from-gray-900 to-gray-700 flex">
            <div className="mx-3 md:mx-24 my-28 justify-center items-center flex w-full">
                <div className="w-full flex flex-col justify-center">
                    <div className="sm:px-6 w-full p-6 pt-3 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                        <div className="mt-3">
                            <div className="mb-2">
                                <label
                                    htmlFor="usernameOrEmail"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Username or email
                                </label>
                                <input
                                    id="usernameOrEmail"
                                    type="text"
                                    name={"usernameOrEmail"}
                                    value={loginRequest.usernameOrEmail}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-2 mt-2 text-black bg-white border
                                    rounded-md focus:border-blue-700 focus:ring-blue-300 focus:outline-none
                                    focus:ring focus:ring-opacity-40"
                                />
                                <span id="loginUsernameOrEmailError" className="text-red-500 text-sm"></span>
                            </div>
                            <div className="mb-2">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    name={"password"}
                                    value={loginRequest.password}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-2 mt-2 text-black bg-white border
                                    rounded-md focus:border-blue-700 focus:ring-blue-300 focus:outline-none
                                    focus:ring focus:ring-opacity-40"
                                />
                                <span id="loginPasswordError" className="text-red-500 text-sm"></span>
                            </div>
                            <div className="mt-6">
                                <button
                                    className="w-full px-4 py-2 tracking-wide text-white transition-colors
                                    duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600
                                    focus:outline-none focus:bg-blue-600"
                                    onClick={login}
                                >
                                    Log in
                                </button>
                            </div>
                        </div>
                        <div className="mt-3 border-t">
                            <button
                                className="mt-3 w-full px-4 py-2 tracking-wide text-white transition-colors
                                duration-200 transform bg-green-700 rounded-md hover:bg-green-600
                                focus:outline-none focus:bg-green-600"
                                onClick={toggleRegistrationModal}
                            >
                                Create new account
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {registrationModal && (
                <RegistrationModal action={toggleRegistrationModal}/>
            )}

            {error && (
                <ErrorNotification message={error}/>
            )}

            {loading && (
                <LoadingModal/>
            )}
        </main>
    )
}