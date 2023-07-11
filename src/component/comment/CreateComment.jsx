import React, { useContext, useState, useRef, useEffect } from "react"
import commentService from "../../api/CommentApi.js"
import { AuthContext } from "../security/AuthContext.js"

export default function CreateComment(props) {

    const { logout } = useContext(AuthContext)
    const [isBodyValid, setIsBodyValid] = useState(false)
    const textareaRef = useRef(null)
    const [request, setRequest] = useState({
        postId: props.postId,
        parentCommentId: props.parentCommentId,
        body: ""
    })

    function validateBody(body) {
        const isValid = body.length > 0
        setIsBodyValid(isValid)
        return isValid
    }

    function handleChange(e) {
        if (e.target.name === "body") {
            validateBody(e.target.value)
        }
        setRequest({ ...request, [e.target.name]: e.target.value })
    }

    function createComment() {
        if (!validateBody(request.body)) {
            return
        }

        commentService.createComment(request)
            .then(response => {
                props.addNewComment(response.data)
                setRequest({ ...request, body: "" })
                setIsBodyValid(false)
            })
            .catch(e => {
                if (e.response.status === 401) {
                    logout()
                }
                console.log(e.response.status + ": " + e.response.data.message)
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
            "bg-[#141E61]",
            "focus:bg-[#141E61]",
            "hover:bg-[#0F044C]"
        )
    }

    useEffect(() => {
        const textarea = textareaRef.current
        textarea.style.height = "auto"
        textarea.style.height = `${textarea.scrollHeight}px`
    }, [request.body])

    return (
        <>
            <div className="p-3 border rounded mb-3">
                <textarea
                    rows="1"
                    name="body"
                    ref={textareaRef}
                    value={request.body}
                    className="mb-2 block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-700
                    focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 overflow-y-hidden"
                    onChange={handleChange}
                    placeholder="Write a new comment"
                ></textarea>
                <div className="flex justify-end w-full">
                    <button
                        className={submitButtonClasses.join(" ")}
                        onClick={createComment}
                        disabled={!isBodyValid}
                    >
                        Publish
                    </button>
                </div>
            </div>
        </>
    )
}
