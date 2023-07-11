import React, { useContext } from "react"
import { AuthContext } from "../security/AuthContext.js"

export default function Header() {

    const {authenticated, getUser} = useContext(AuthContext)

    return (
        <>
            <header
                className="w-full flex py-6 px-10 items-center justify-between border-b border-gray-200 bg-[#F6F6F6]"
            >
                <div className="flex flex-col">
                    <a
                        className="text-[#141E61] text-2xl cursor-pointer"
                        href={"/"}
                    >
                        Social Media
                    </a>
                    {authenticated && (
                        <span>Hello, {getUser().username}</span>
                    )}
                </div>
            </header>
        </>
    )
}
