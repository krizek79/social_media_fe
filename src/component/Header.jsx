import React, {useState} from "react"
import authService from "../service/AuthService.js"
import {useNavigate} from "react-router-dom"
import LogoutModal from "./LogoutModal";

export default function Header() {

    const navigate = useNavigate()
    const [logoutModal, setLogoutModal] = useState(false)

    function logout() {
        authService.logout()
        navigate("/")
    }

    function toggleLogoutModal() {
        setLogoutModal(!logoutModal)
    }

    return (
        <>
            <header className="flex py-6 px-10 bg-white shadow-md items-end justify-between top-0">
                <div className="flex flex-col">
                    <h1
                        className="text-blue-700 text-3xl cursor-pointer"
                        onClick={() => navigate("/home")}
                    >
                        Social Media
                    </h1>
                    {localStorage.getItem("username") && (
                        <h2
                            className="text-xl"
                        >
                            Hello, {" "}
                            <a
                                className="hover:cursor-pointer hover:underline text-blue-600"
                                href={"/profile?username=" + localStorage.getItem("username")}
                            >
                                {localStorage.getItem("username")}
                            </a>
                        </h2>
                    )}
                </div>

                {localStorage.getItem("authenticationToken") && (
                    <div className="gap-x-6 flex">
                        <div className="text-center">
                            <a
                                className="text-blue-600 text-lg cursor-pointer"
                                onClick={toggleLogoutModal}
                            >
                                Log out
                            </a>
                        </div>
                    </div>
                )}
            </header>

            {logoutModal && (
                <LogoutModal toggle={toggleLogoutModal} action={logout}/>
            )}
        </>
    )
}