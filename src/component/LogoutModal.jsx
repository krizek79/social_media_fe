export default function LogoutModal(props) {

    const toggleModal = props.toggle
    const action = props.action

    return (
        <>
            <div
                className="mx-3 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0
                z-50 outline-none focus:outline-none"
            >
                <div className="w-full absolute flex flex-col justify-center min-h-screen overflow-hidden">
                    <div className="sm:px-6 w-full p-6 pt-3 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                        <div className="text-lg text-center p-6">
                            Do you really want to log out?
                        </div>
                        <div className="flex justify-center gap-x-3">
                            <button
                                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200
                            transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                                onClick={() => {
                                    action()
                                    toggleModal()
                                }}
                            >
                                YES
                            </button>
                            <button
                                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200
                                transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none
                                focus:bg-red-600"
                                onClick={toggleModal}
                            >
                                NO
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}