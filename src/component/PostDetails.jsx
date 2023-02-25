import React, {useState} from "react";
import postService from "../service/PostService.js";
import LoadingModal from "./LoadingModal.jsx";
import ErrorNotification from "./ErrorNotification.jsx";

export default function PostDetails(props) {

    const toggle = props.toggle
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isEditable, setIsEditable] = useState(false)
    const [request, setRequest] = useState({
        body: props.body
    })

    function deletePost() {
        setLoading(true)
        setError(null)
        postService.deletePost(props.id)
            .then(() => {
                setLoading(false)
                toggle()
                location.reload()
            })
            .catch(e => {
                setError(e.response.data.message)
                setLoading(false)
            })
    }

    function toggleEdit() {
        if (isEditable) {
            setRequest({
                body: props.body
            })
        }
        setIsEditable(!isEditable)
    }

    function updatePost() {
        setLoading(true)
        setError(null)
        postService.updatePost(props.id, request)
            .then(() => {
                setLoading(false)
                toggle()
                location.reload()
            })
            .catch(e => {
                setError(e.response.data.message)
                setLoading(false)
            })
    }

    function handleChange(e) {
        setRequest({...request, [e.target.name]: e.target.value})
    }

    return (
        <>
            <div
                className="mx-3 justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="absolute flex flex-col justify-center min-h-screen overflow-hidden w-11/12 md:w-7/12">
                    <div className="sm:px-6 p-6 pt-3 m-auto bg-white rounded-md shadow-md w-full">
                        <div className={"flex justify-between border-b pb-3"}>
                            <div className="flex flex-row gap-x-3">
                                <img
                                    src={props.owner.avatarUrl}
                                    alt={"User avatar..."}
                                    className="rounded object-scale-down h-12 w-12"
                                />
                                <div
                                    className="gap-y-1/2 flex flex-col"
                                >
                                    <div className="font-medium text-lg">
                                        {props.owner.username}
                                    </div>
                                    <div className="font-normal text-xs">
                                        {props.createdAt}
                                    </div>
                                </div>
                            </div>
                            <button
                                className="text-2xl text-center cursor-pointer self-start"
                                onClick={toggle}
                            >
                                &times;
                            </button>
                        </div>
                        {isEditable ? (
                            <div className="p-3 bg-gray-100">
                                <textarea
                                    name="body"
                                    value={request.body}
                                    onChange={handleChange}
                                    className="mb-2 block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md
                                    focus:border-blue-700 focus:ring-blue-300 focus:outline-none focus:ring
                                    focus:ring-opacity-40"
                                >
                                    {request.body}
                                </textarea>
                            </div>
                        ) : (
                            <div className="p-3 bg-gray-100">
                                <div className="py-2 break-normal">
                                    {request.body}
                                </div>
                            </div>
                        )}

                        {props.owner.username === localStorage.getItem("username")
                        || localStorage.getItem("role") === "ADMIN" ? (
                            <div className="justify-end w-full flex flex-row gap-x-3 pt-3">
                                {isEditable ? (
                                    <div className="flex flex-row gap-x-3">
                                        <a
                                            className="text-violet-600 cursor-pointer hover:underline"
                                            onClick={updatePost}
                                        >
                                            Save
                                        </a>
                                        <a
                                            className="text-red-600 cursor-pointer hover:underline"
                                            onClick={toggleEdit}
                                        >
                                            Cancel
                                        </a>
                                    </div>
                                ) : (
                                    <div className="flex flex-row gap-x-3">
                                        <a
                                            className="text-violet-600 cursor-pointer hover:underline"
                                            onClick={toggleEdit}
                                        >
                                            Edit
                                        </a>
                                        <a
                                            className="text-red-600 cursor-pointer hover:underline"
                                            onClick={deletePost}
                                        >
                                            Delete
                                        </a>
                                    </div>
                                )}
                            </div>
                        ) : null}

                        <div className="py-3 font-medium text-base">
                            Comments (999)
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>

            {loading && (
                <LoadingModal/>
            )}

            {error && (
                <ErrorNotification message={error}/>
            )}
        </>
    )
}