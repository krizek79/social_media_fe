import React from "react"
import authService from "../service/AuthService.js"
import {useNavigate} from "react-router-dom"

export default function Header() {

    const navigate = useNavigate()

    function logout() {
        authService.logout()
        navigate("/")
    }

    return (
        <header className={"flex py-6 px-10 bg-white shadow-md items-end justify-between top-0"}>
            <div className={"flex flex-col"}>
                <h1
                    className={"text-blue-700 text-3xl cursor-pointer"}
                    onClick={() => location.reload()}
                >
                    Social Media
                </h1>
                {localStorage.getItem("username") && (
                    <h2 className="text-blue-600 text-xl">
                        Hello, {localStorage.getItem("username")}
                    </h2>
                )}
            </div>

            {localStorage.getItem("authenticationToken") && (
                <div className={"gap-x-6 flex"}>
                    <div className={"text-center"}>
                        <a
                            className={"text-blue-600 text-lg cursor-pointer"}
                            onClick={logout}
                        >
                            Log out
                        </a>
                    </div>
                </div>
            )}
        </header>
    )
}