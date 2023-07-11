import React, { useContext, useState } from "react";
import { AuthContext } from "../security/AuthContext.js";

export default function FooterMenu() {
    const { logout, getUser } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function handleLogout() {
        logout();
        toggleMenu();
    }

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <footer className="flex z-20 w-full bg-[#F6F6F6] border-t border-gray-200">
            <button
                className="flex w-full justify-center py-4 hover:bg-gray-200 items-center hover:cursor-pointer"
                onClick={toggleMenu}
            >
                <img
                    src={getUser().avatarUrl}
                    alt={"Profile picture"}
                    className="rounded-full h-8 w-8 object-scale-down"
                />
                {isMenuOpen && (
                    <>
                        <div className="fixed flex items-center justify-center inset-0 z-50">
                            <div className="flex flex-col bg-white rounded">
                                <a
                                    href={`/profile?username=${getUser().username}`}
                                    className="w-full px-12 py-6 hover:bg-gray-200 duration-300"
                                >
                                    My profile
                                </a>
                                <div
                                    className="w-full px-12 py-6 hover:cursor-pointer hover:bg-gray-200 duration-300 border-t"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </div>
                            </div>
                        </div>
                        <div
                            className="fixed inset-0 z-40 bg-black opacity-50"
                            onClick={toggleMenu}
                        ></div>
                    </>
                )}
            </button>
            <div className="my-1.5 border-r border-gray-700"></div>
            <a
                className="flex w-full justify-center py-4 hover:bg-gray-200 items-center"
                href="/"
            >
                <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="h-6 w-6"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path>
                </svg>
            </a>
            <div className="my-1.5 border-r border-gray-700"></div>
            <a
                className="flex w-full justify-center py-4 hover:bg-gray-200 items-center"
                href="/explore"
            >
                <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="h-6 w-6"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
                </svg>
            </a>
        </footer>
    );
}
