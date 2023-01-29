import React, {useState} from "react"
import Register from "./Register.jsx"
import authService from "../service/AuthService.js"
import {useNavigate} from "react-router-dom"

export default function Login() {

    const navigate = useNavigate()
    const [registrationModal, setRegistrationModal] = useState(false)
    const [loginRequest, setLoginRequest] = useState({
        email: "",
        password: ""
    })

    function toggleRegistrationModal() {
        setRegistrationModal(!registrationModal)
    }

    function handleChange(e) {
        setLoginRequest({...loginRequest, [e.target.name]: e.target.value})
    }

    function login(e) {
        e.preventDefault()
        authService.login(loginRequest)
            .then(response => {
                if (response.data.authenticationToken) {
                    localStorage.setItem("authenticationToken", response.data.authenticationToken)
                    localStorage.setItem("username", response.data.username)
                }
                navigate("/home")
            })
            .catch(e => {
                console.log(e.response.status + ": " + e.response.data.message)
                navigate("/")
            })
    }

    return (
        <main className="bg-gradient-to-b from-gray-900 to-gray-700 flex">
            <div className="mx-3 md:mx-24 my-28 justify-center items-center flex w-full">
                <div className="w-full flex flex-col justify-center">
                    <div className="sm:px-6 w-full p-6 pt-3 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                        <form className="mt-3">
                            <div className="mb-2">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name={"email"}
                                    value={loginRequest.email}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-2 mt-2 text-black bg-white border
                                    rounded-md focus:border-blue-700 focus:ring-blue-300 focus:outline-none
                                    focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="mb-2">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name={"password"}
                                    value={loginRequest.password}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-2 mt-2 text-black bg-white border
                                    rounded-md focus:border-blue-700 focus:ring-blue-300 focus:outline-none
                                    focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            {/*<a*/}
                            {/*    href="src/components#"*/}
                            {/*    className="text-xs text-blue-700 hover:underline"*/}
                            {/*>*/}
                            {/*    Forgot Password?*/}
                            {/*</a>*/}
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
                        </form>
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
                <Register action={toggleRegistrationModal}/>
            )}
        </main>
    )
}