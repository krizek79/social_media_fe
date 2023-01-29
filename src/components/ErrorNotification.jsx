export default function ErrorNotification(props) {

    const message = props.message

    return (
        <div
            className="absolute right-0 top-28 px-6 py-2 bg-white text-red-500 font-medium border-2 border-l-red-500
            border-t-red-500 border-b-red-500 rounded-tl-lg rounded-bl-lg z-50"
        >
            {message}
        </div>
    )
}