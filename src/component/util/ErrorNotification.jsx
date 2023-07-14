import {useState} from "react"

export default function ErrorNotification(props) {

    const message = props.message
    const [isClosed, setIsClosed] = useState(false)

    return (
        <>
            {!isClosed && (
                <div className="flex w-full p-3 hover:opacity-95 duration-300 bg-red-400 justify-between">
                    <div className="">
                        {message}
                    </div>
                    <div className="">
                        <button onClick={() => {
                            props.setApiError(null)
                            setIsClosed(true)
                        }}>
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}