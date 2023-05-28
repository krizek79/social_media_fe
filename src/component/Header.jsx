import React, { useState } from "react";
import authService from "../service/AuthService.js";
import { useNavigate } from "react-router-dom";

export default function Header() {

    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function logout() {
        authService.logout()
        toggleMenu()
        navigate("/authentication")
    }

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <>
            <header className="w-full flex py-6 px-10 bg-white shadow-md items-center justify-between top-0">
                <div className="flex flex-col">
                    <h1
                        className="text-blue-700 text-2xl cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        Social Media
                    </h1>
                    {localStorage.getItem("authenticationToken") && (
                        <span>Hello, {localStorage.getItem("username")}</span>
                    )}
                </div>
                {localStorage.getItem("authenticationToken") && (
                    <>
                        <img
                            src={localStorage.getItem("avatarUrl")}
                            alt={"Profile picture"}
                            className="rounded-full h-12 w-12 object-scale-down hover:cursor-pointer"
                            onClick={toggleMenu}
                        />
                        {isMenuOpen && (
                            <>
                                <div className="fixed z-50 bottom-0 top-0 left-0 bg-white px-3 w-2/3 md:w-1/4">
                                    <ul className="text-xl font-medium w-full">
                                        <li className="px-6 py-6 flex flex-col gap-y-6 hover:bg-gray-100 duration-300">
                                            <button
                                                className="w-full text-left"
                                                onClick={() => {
                                                    toggleMenu()
                                                    navigate("/profile?username="
                                                        + localStorage.getItem("username"))
                                                }}
                                            >
                                                My profile
                                            </button>
                                        </li>
                                    </ul>
                                    <div
                                        className="px-6 py-6 text-xl font-medium w-full border-t hover:bg-gray-100
                                        duration-300"
                                    >
                                        <button
                                            className="w-full text-left"
                                            onClick={logout}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                                <div className="opacity-75 fixed inset-0 z-40 bg-black" onClick={toggleMenu}></div>
                            </>
                        )}
                    </>
                )}
            </header>
        </>
    )
}
