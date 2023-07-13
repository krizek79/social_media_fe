import React, { Fragment, useContext, useState} from "react";
import {AuthContext} from "../security/AuthContext.js";
import {Dialog, Transition} from "@headlessui/react";

export default function FooterMenuProfilePictureDialog() {

    const { logout, getUser } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)

    function handleLogout() {
        logout();
        toggleMenu();
    }

    function toggleMenu() {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <button
                className="flex w-full justify-center py-4 hover:bg-gray-200 items-center hover:cursor-pointer"
                onClick={toggleMenu}
            >
                <img
                    src={getUser().avatarUrl}
                    alt={"Profile picture"}
                    className="rounded-full h-8 w-8 object-scale-down"
                />
            </button>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={toggleMenu}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-50"/>
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className="transform overflow-hidden rounded bg-white text-center align-middle
                                    shadow-xl transition-all"
                                >
                                    <div className="flex flex-col bg-white rounded">
                                        <a
                                            href={`/profile?username=${getUser().username}`}
                                            className="w-full px-12 py-6 hover:bg-gray-200 duration-300"
                                        >
                                            My profile
                                        </a>
                                        <div
                                            className="w-full px-12 py-6 hover:cursor-pointer hover:bg-gray-200
                                            duration-300 border-t"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}