import React, {useEffect, useState} from "react";
import authService from "../../service/AuthService.js";
import { useNavigate } from "react-router-dom";

export default function Header() {

    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const userData = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        if (!localStorage.getItem("authenticationToken")) {
            navigate("/authentication")
        }
    }, [])

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
                    <a
                        className="text-blue-700 text-2xl cursor-pointer"
                        href={"/"}
                    >
                        Social Media
                    </a>
                    {localStorage.getItem("authenticationToken") && (
                        <span>Hello, {userData.username}</span>
                    )}
                </div>
                {localStorage.getItem("authenticationToken") && (
                    <>
                        <img
                            src={userData.avatarUrl}
                            alt={"Profile picture"}
                            className="rounded-full h-12 w-12 object-scale-down hover:cursor-pointer"
                            onClick={toggleMenu}
                        />
                        {isMenuOpen && (
                            <>
                                <div className="fixed z-50 bottom-0 top-0 left-0 bg-white px-3 w-2/3 md:w-1/4">
                                    <ul className="text-xl font-medium w-full">
                                        <li className="flex flex-col gap-y-6 hover:bg-gray-100 duration-300">
                                            <a
                                                href={`/profile?username=${userData.username}`}
                                                className="w-full text-left px-6 py-6"
                                            >
                                                My profile
                                            </a>
                                        </li>
                                        <li className="flex flex-col gap-y-6 hover:bg-gray-100 duration-300">
                                            <a
                                                href={"/"}
                                                className="w-full text-left px-6 py-6"
                                            >
                                                Home
                                            </a>
                                        </li>
                                        <li className="flex flex-col gap-y-6 hover:bg-gray-100 duration-300">
                                            <a
                                                href={"/explore"}
                                                className="w-full text-left px-6 py-6"
                                            >
                                                Explore
                                            </a>
                                        </li>
                                    </ul>
                                    <button
                                        className="px-6 py-6 text-xl font-medium w-full border-t hover:bg-gray-100
                                        duration-300 text-left"
                                        onClick={logout}
                                    >
                                        Logout
                                    </button>
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
