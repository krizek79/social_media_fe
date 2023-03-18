import postService from "../service/PostService.js"
import React, {useState} from "react";
import LoadingModal from "./LoadingModal.jsx";
import ErrorNotification from "./ErrorNotification.jsx";

export default function CreatePost(props) {

    const [request, setRequest] = useState({
        body: ""
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isBodyValid, setIsBodyValid] = useState(false)

    function validateBody(body) {
        const submitButton = document.getElementById("submitButton")
        const isValid = body.length > 0
        setIsBodyValid(isValid)
        if (!isValid) {
            submitButton.classList.remove("bg-green-700", "focus:bg-green-600", "hover:bg-green-600")
            submitButton.classList.add("bg-gray-900", "opacity-50", "hover:cursor-not-allowed")
            return false
        }
        submitButton.classList.remove("bg-gray-900", "opacity-50", "hover:cursor-not-allowed")
        submitButton.classList.add("bg-green-700", "focus:bg-green-600", "hover:bg-green-600", "hover:cursor-pointer")
        return true
    }

    function handleChange(e) {
        if (e.target.name === "body") {
            validateBody(e.target.value)
        }
        setRequest({...request, [e.target.name]: e.target.value})
    }

    function createPost() {
        setError(null)
        if (!validateBody(request.body)) {
            return
        }

        setLoading(true)
        postService.createPost(request)
            .then(response => {
                props.addNewPost(response.data)
                setRequest({...request, body: ""})
                setLoading(false)
            })
            .catch(e => {
                setError(e.response.data.message)
                setLoading(false)
            })
    }

    return (
        <>
            <div className="p-5 border rounded mb-3">
                <textarea
                    id="body"
                    rows="4"
                    name={"body"}
                    value={request.body}
                    className="mb-2 block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-700
                    focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    onChange={handleChange}
                    placeholder="What is on your mind?">
                </textarea>
                <div className="flex justify-end w-full">
                    <button
                        id={"submitButton"}
                        className="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform
                        rounded-md focus:outline-none bg-gray-900 opacity-50 hover:cursor-not-allowed"
                        onClick={createPost}
                        disabled={!isBodyValid}
                    >
                        Publish
                    </button>
                </div>
            </div>

            {loading && (
                <LoadingModal/>
            )}

            {error && (
                <ErrorNotification message={error}/>
            )}
        </>
    )
}