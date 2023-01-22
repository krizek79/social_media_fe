import React from "react";
export default function Login() {
    const [showModal, setShowModal] = React.useState(false);

    return (
        <>
            <div className={"text-center"}>
                <a
                    className={"text-blue-600 text-lg cursor-pointer"}
                    onClick={() => setShowModal(true)}
                >
                    Sign in
                </a>
            </div>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0
                        z-50 outline-none focus:outline-none"
                    >
                        <div className="w-full absolute flex flex-col justify-center min-h-screen overflow-hidden">
                            <div className="w-full p-6 pt-3 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                                <div className={"width-full text-end"}>
                                    <button
                                        className="text-2xl text-center cursor-pointer"
                                        onClick={() => setShowModal(false)}
                                    >
                                        &times;
                                    </button>
                                </div>
                                <form className="mt-3">
                                    <div className="mb-2">
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="block w-full px-4 py-2 mt-2 text-black bg-white border
                                            rounded-md focus:border-blue-700 focus:ring-blue-300 focus:outline-none
                                            focus:ring focus:ring-opacity-40"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className="block w-full px-4 py-2 mt-2 text-black bg-white border
                                            rounded-md focus:border-blue-700 focus:ring-blue-300 focus:outline-none
                                            focus:ring focus:ring-opacity-40"
                                        />
                                    </div>
                                    <a
                                        href="#"
                                        className="text-xs text-blue-700 hover:underline"
                                    >
                                        Forget Password?
                                    </a>
                                    <div className="mt-6">
                                        <button
                                            className="w-full px-4 py-2 tracking-wide text-white transition-colors
                                            duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600
                                            focus:outline-none focus:bg-blue-600">
                                            Login
                                        </button>
                                    </div>
                                </form>

                                <p className="mt-8 text-xs font-light text-center text-gray-700">
                                    Don't have an account?{" "}
                                    <a
                                        href="#"
                                        className="font-medium text-blue-700 hover:underline"
                                    >
                                        Sign up
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    )
}