import postService from "../../api/PostApi.js"
import React, {useContext, useState} from "react"
import ErrorNotification from "../util/ErrorNotification.jsx"
import {AuthContext} from "../security/AuthContext.js"

export default function CreatePost(props) {

    const { logout } = useContext(AuthContext)
    const [error, setError] = useState(null)
    const [isBodyValid, setIsBodyValid] = useState(false)
    const [request, setRequest] = useState({
        body: ""
    })

    function validateBody(body) {
        const isValid = body.length > 0;
        setIsBodyValid(isValid);
        return isValid;
    }

    function handleChange(e) {
        if (e.target.name === "body") {
            validateBody(e.target.value);
        }
        setRequest({ ...request, [e.target.name]: e.target.value });
    }

    function createPost() {
        setError(null)
        if (!validateBody(request.body)) {
            return
        }

        postService.createPost(request)
            .then(response => {
                props.addNewPost(response.data)
                setRequest({ ...request, body: "" })
                setIsBodyValid(false)
            })
            .catch(e => {
                if (e.response.status === 401) {
                    logout()
                }
                console.log(e.response.status + ": " + e.response.data.message)
                setError(e.response.data.message)
            })
    }

    const submitButtonClasses = [
        "px-4",
        "py-2",
        "tracking-wide",
        "text-white",
        "transition-colors",
        "duration-200",
        "transform",
        "rounded-md",
        "focus:outline-none",
        "hover:cursor-pointer"
    ]

    if (!isBodyValid) {
        submitButtonClasses.push(
            "bg-gray-900",
            "opacity-50",
            "hover:cursor-not-allowed"
        )
    } else {
        submitButtonClasses.push(
            "bg-green-700",
            "focus:bg-green-600",
            "hover:bg-green-600"
        )
    }

    return (
        <>
            <div className="p-3 border rounded">
                <textarea
                    id="body"
                    rows="4"
                    name="body"
                    value={request.body}
                    className="mb-2 block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md
                    focus:border-blue-700 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    onChange={handleChange}
                    placeholder="What is on your mind?"
                ></textarea>
                <div className="flex justify-end w-full">
                    <button
                        className={submitButtonClasses.join(" ")}
                        onClick={createPost}
                        disabled={!isBodyValid}
                    >
                        Publish
                    </button>
                </div>
            </div>

            {error && <ErrorNotification message={error} />}
        </>
    )
}
