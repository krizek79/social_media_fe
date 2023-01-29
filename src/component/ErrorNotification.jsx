import {useState} from "react";

export default function ErrorNotification(props) {

    const message = props.message
    const [modal, setModal] = useState(true)

    function toggleModal() {
        setModal(!modal)
    }

    return (
        <>
            {modal && (
                <div
                    className="flex absolute right-0 top-28 py-2 bg-white border-2
                    border-l-red-500 border-t-red-500 border-b-red-500 rounded-tl-lg rounded-bl-lg z-50"
                >
                    <div className="pl-3 font-medium text-red-500">
                        {message}
                    </div>
                    <button
                        className="px-3 text-center"
                        onClick={toggleModal}
                    >
                        &times;
                    </button>
                </div>
            )}
        </>
    )
}