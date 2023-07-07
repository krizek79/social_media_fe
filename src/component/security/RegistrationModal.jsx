import authService from "../../api/AuthenticationApi.js"
import React, {useState} from "react";
import ErrorNotification from "../util/ErrorNotification.jsx";
import {useNavigate} from "react-router-dom";

export default function RegistrationModal(props) {

    const toggleModal = props.action
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const [registrationRequest, setRegistrationRequest] = useState({
        email: "",
        username: "",
        password: "",
        matchingPassword: ""
    })

    function validateEmail(email) {
        const emailError = document.getElementById("registrationEmailError")
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            emailError.innerHTML = "Please enter a valid email"
            return false
        }
        emailError.innerHTML = ""
        return true
    }

    function validateUsername(username) {
        const usernameError = document.getElementById("registrationUsernameError")
        if (username.length === 0) {
            usernameError.innerHTML = "Please enter the username"
            return false
        }
        usernameError.innerHTML = ""
        return true
    }

    function validatePassword(password) {
        const passwordError = document.getElementById("registrationPasswordError")
        if (password.length === 0) {
            passwordError.innerHTML = "Please enter the password"
            return false
        }
        passwordError.innerHTML = ""
        return true
    }

    function validateMatchingPassword(matchingPassword, password) {
        const matchingPasswordError = document.getElementById("registrationMatchingPasswordError")

        if (matchingPassword.length === 0) {
            matchingPasswordError.innerHTML = "Please enter the matching password"
            return false
        }

        if (matchingPassword !== password) {
            matchingPasswordError.innerHTML = "Passwords do not match"
            return false
        }

        matchingPasswordError.innerHTML = ""
        return true
    }

    function handleChange(e) {
        if (e.target.name === "email") {
            validateEmail(e.target.value)
        }
        if (e.target.name === "username") {
            validateUsername(e.target.value)
        }
        if (e.target.name === "password") {
            validatePassword(e.target.value)
            validateMatchingPassword(registrationRequest.matchingPassword, e.target.value)
        }
        if (e.target.name === "matchingPassword") {
            validateMatchingPassword(e.target.value, registrationRequest.password)
        }
        setRegistrationRequest({...registrationRequest, [e.target.name]: e.target.value})
    }

    function register() {
        setError(null)
        let emailValid = validateEmail(registrationRequest.email);
        let usernameValid = validateUsername(registrationRequest.username);
        let passwordValid = validatePassword(registrationRequest.password);
        let matchingPasswordValid = validateMatchingPassword(
            registrationRequest.matchingPassword,
            registrationRequest.password
        )
        if (!emailValid
            || !usernameValid
            || !passwordValid
            || !matchingPasswordValid
        ) {
            return
        }

        return authService.register(registrationRequest)
            .then(() => {
                toggleModal()
                navigate("/registration-successful")
            })
            .catch(e => {
                console.log(e.response.status + ": " + e.response.data.message)
                setError(e.response.data.message)
            })
    }

    return (
        <>
            <div
                className="justify-center items-center flex flex-col fixed inset-0 z-50 outline-none
                focus:outline-none w-full rounded-md"
            >
                <div
                    className="sm:px-6 w-11/12 md:w-full p-6 pt-3 m-auto bg-white rounded-md shadow-md lg:max-w-xl
                    overflow-y-auto"
                >
                    <div className={"flex width-full justify-between border-b pb-3"}>
                        <div className="text-lg font-medium self-end">
                            Create new account
                        </div>
                        <button
                            className="text-2xl text-center cursor-pointer"
                            onClick={toggleModal}
                        >
                            &times;
                        </button>
                    </div>
                    <div className="mt-3">
                        <div className="mb-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name={"email"}
                                value={registrationRequest.email}
                                onChange={handleChange}
                                className="block w-full px-4 py-2 mt-2 text-black bg-white border
                                rounded-md focus:border-blue-700 focus:ring-blue-300 focus:outline-none
                                focus:ring focus:ring-opacity-40"
                            />
                            <span id="registrationEmailError" className="text-red-500 text-sm"></span>
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor="username"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                name={"username"}
                                value={registrationRequest.username}
                                className="block w-full px-4 py-2 mt-2 text-black bg-white border
                                    rounded-md focus:border-blue-700 focus:ring-blue-300 focus:outline-none
                                    focus:ring focus:ring-opacity-40"
                                onChange={handleChange}
                            />
                            <span id="registrationUsernameError" className="text-red-500 text-sm"></span>
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
                                value={registrationRequest.password}
                                className="block w-full px-4 py-2 mt-2 text-black bg-white border
                                rounded-md focus:border-blue-700 focus:ring-blue-300 focus:outline-none
                                focus:ring focus:ring-opacity-40"
                                onChange={handleChange}
                            />
                            <span id="registrationPasswordError" className="text-red-500 text-sm"></span>
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor="matchingPassword"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Repeat password
                            </label>
                            <input
                                id="matchingPassword"
                                type="password"
                                name={"matchingPassword"}
                                value={registrationRequest.matchingPassword}
                                className="block w-full px-4 py-2 mt-2 text-black bg-white border
                                rounded-md focus:border-blue-700 focus:ring-blue-300 focus:outline-none
                                focus:ring focus:ring-opacity-40"
                                onChange={handleChange}
                            />
                            <span id="registrationMatchingPasswordError" className="text-red-500 text-sm"></span>
                        </div>
                        <div className="mt-6">
                            <button
                                className="w-full px-4 py-2 tracking-wide text-white transition-colors
                                    duration-200 transform bg-green-700 rounded-md hover:bg-green-600
                                    focus:outline-none focus:bg-green-600"
                                onClick={register}
                            >
                                Sign up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>

            {error && (
                <ErrorNotification message={error}/>
            )}
        </>
    )
}