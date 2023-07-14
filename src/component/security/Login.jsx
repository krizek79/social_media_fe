import React, {useContext, useState} from "react"
import authService from "../../api/AuthenticationApi.js"
import {useNavigate} from "react-router-dom"
import {AuthContext} from "./AuthContext.js"
import RegistrationDialog from "./RegistrationDialog.jsx"
import ErrorNotification from "../util/ErrorNotification.jsx";

export default function Login() {

    const { login } = useContext(AuthContext)
    const navigate = useNavigate()
    const [apiError, setApiError] = useState(null)
    const [loginRequest, setLoginRequest] = useState({
        usernameOrEmail: "",
        password: ""
    })
    const [fieldErrors, setFieldErrors] = useState({
        usernameOrEmail: "",
        password: ""
    })

    function validateField(name, value) {
        let error = ""

        switch (name) {
            case "usernameOrEmail":
                if (value.length === 0) {
                    error = "Username/email is required"
                }
                break
            case "password":
                if (value.length === 0) {
                    error = "Password is required"
                }
                break
            default:
                break
        }

        setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: error }))
    }


    function handleChange(e) {
        const { name, value } = e.target
        setLoginRequest({ ...loginRequest, [name]: value })
        validateField(name, value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        handleLogin()
    }

    function handleLogin() {
        setApiError(null)
        authService.login(loginRequest)
            .then(response => {
                login(response.data)
                navigate("/")
            })
            .catch(e => {
                if (e.response?.status === 401) {
                    setApiError("Wrong email/username or password")
                } else {
                    console.log(e)
                }
            })
    }

    return (
        <div className="flex w-full h-full">
            <div className="justify-center items-center flex w-full">
                <div className="w-full flex flex-col justify-center px-3">
                    <div className="sm:px-6 w-full p-6 pt-3 m-auto bg-[#F6F6F6] rounded-md shadow-md md:max-w-xl">
                        <form className="flex flex-col gap-y-2 my-3" onSubmit={handleSubmit}>
                            <div>
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
                                    rounded-md focus:border-[#0F044C] focus:ring-[#141E61] focus:outline-none
                                    focus:ring focus:ring-opacity-40"
                                />
                                {fieldErrors.usernameOrEmail && (
                                    <span className="text-red-500 text-sm">{fieldErrors.usernameOrEmail}</span>
                                )}
                            </div>
                            <div>
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
                                    rounded-md focus:border-[#0F044C] focus:ring-[#141E61] focus:outline-none
                                    focus:ring focus:ring-opacity-40"
                                />
                                {fieldErrors.password && (
                                    <span className="text-red-500 text-sm">{fieldErrors.password}</span>
                                )}
                            </div>
                            {apiError && (
                                <div className="mt-6">
                                    <ErrorNotification message={apiError} setApiError={setApiError}/>
                                </div>
                            )}
                            <button
                                className="w-full mt-6 py-2 tracking-wide text-white duration-200 bg-[#141E61]
                                rounded-md hover:bg-[#0F044C] focus:outline-none focus:bg-[#0F044C]"
                            >
                                Log in
                            </button>
                        </form>
                        <div className="flex flex-col gap-y-3">
                            <div className="border-t"></div>
                            <RegistrationDialog/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}