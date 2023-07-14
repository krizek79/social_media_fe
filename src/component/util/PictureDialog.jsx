import React, {Fragment, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";

export default function PictureDialog(props) {

    const [isOpen, setIsOpen] = useState(false)

    function toggleDialog() {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <button onClick={toggleDialog}>
                <img
                    src={props.src}
                    alt={props.alt}
                    className={props.classes.join(" ")}
                />
            </button>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={toggleDialog}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-75"/>
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
                                    className="transform overflow-hidden rounded bg-[#F6F6F6] text-center align-middle
                                    shadow-xl transition-all"
                                >
                                    <div className="rounded">
                                        <img
                                            src={props.src}
                                            alt={props.alt}
                                        />
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