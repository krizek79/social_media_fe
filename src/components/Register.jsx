export default function Register(props) {

    const toggleModal = props.action

    return (
        <>
            <div
                className="mx-3 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0
                z-50 outline-none focus:outline-none"
            >
                <div className="w-full absolute flex flex-col justify-center min-h-screen overflow-hidden">
                    <div className="sm:px-6 w-full p-6 pt-3 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                        <div className={"flex width-full justify-between border-b pb-3"}>
                            <div className="text-lg font-medium self-end">
                                Create new account
                            </div>
                            <button
                                className="text-2xl text-center cursor-pointer"
                                onClick={toggleModal}
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
                                    id="email"
                                    type="email"
                                    className="block w-full px-4 py-2 mt-2 text-black bg-white border
                                    rounded-md focus:border-blue-700 focus:ring-blue-300 focus:outline-none
                                    focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="mb-2">
                                <label
                                    htmlFor="username"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Username
                                </label>
                                <input
                                    id="username"
                                    type="text"
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
                                    id="password"
                                    type="password"
                                    className="block w-full px-4 py-2 mt-2 text-black bg-white border
                                    rounded-md focus:border-blue-700 focus:ring-blue-300 focus:outline-none
                                    focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="mb-2">
                                <label
                                    htmlFor="matchingPassword"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Repeat password
                                </label>
                                <input
                                    id="matchingPassword"
                                    type="password"
                                    className="block w-full px-4 py-2 mt-2 text-black bg-white border
                                    rounded-md focus:border-blue-700 focus:ring-blue-300 focus:outline-none
                                    focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="mt-6">
                                <button
                                    className="w-full px-4 py-2 tracking-wide text-white transition-colors
                                    duration-200 transform bg-green-700 rounded-md hover:bg-green-600
                                    focus:outline-none focus:bg-green-600"
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}