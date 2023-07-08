import React, { useContext, useState } from "react"
import { AuthContext } from "../security/AuthContext.js"

export default function Header() {

    const {logout, authenticated, getUser} = useContext(AuthContext)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function handleLogout() {
        logout()
        toggleMenu()
    }

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <>
            <header className="w-full flex py-6 px-10 items-center justify-between border-b border-black">
                <div className="flex flex-col">
                    <a
                        className="text-blue-700 text-2xl cursor-pointer"
                        href={"/"}
                    >
                        Social Media
                    </a>
                    {authenticated && (
                        <span>Hello, {getUser().username}</span>
                    )}
                </div>
                {authenticated && (
                    <>
                        <img
                            src={getUser().avatarUrl}
                            alt={"Profile picture"}
                            className="rounded-full h-12 w-12 object-scale-down hover:cursor-pointer"
                            onClick={toggleMenu}
                        />
                        {isMenuOpen && (
                            <>
                                <div className="fixed z-50 flex flex-col bg-white right-4 top-20 rounded">
                                    <a
                                        href={`/profile?username=${getUser().username}`}
                                        className="w-full px-6 py-3 hover:bg-gray-100 duration-300"
                                    >
                                        My profile
                                    </a>
                                    <div
                                        className="w-full px-6 py-3 hover:cursor-pointer hover:bg-gray-100 duration-300
                                        border-t"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </div>
                                </div>
                                <div className="opacity-50 fixed inset-0 z-40 bg-black" onClick={toggleMenu}></div>
                            </>
                        )}
                    </>
                )}
            </header>
        </>
    )
}
