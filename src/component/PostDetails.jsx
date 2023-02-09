import React, {useState} from "react";
import postService from "../service/PostService.js";
import LoadingModal from "./LoadingModal.jsx";
import ErrorNotification from "./ErrorNotification.jsx";

export default function PostDetails(props) {

    const toggle = props.toggle
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    function deletePost() {
        setLoading(true)
        setError(null)
        postService.deletePost(props.id)
            .then(() => {
                setLoading(false)
                location.reload()
            })
            .catch(e => {
                setError(e.response.data.message)
                setLoading(false)
            })
    }

    return (
        <>
            <div
                className="mx-3 justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="absolute flex flex-col justify-center min-h-screen overflow-hidden w-7/12">
                    <div className="sm:px-6 p-6 pt-3 m-auto bg-white rounded-md shadow-md w-full">
                        <div className={"flex justify-between border-b pb-3"}>
                            <div
                                className="gap-y-1/2 justify-between flex flex-col"
                            >
                                <div className="font-medium text-lg">
                                    {props.ownerUsername}
                                </div>
                                <div className="font-normal text-xs">
                                    {props.createdAt}
                                </div>
                            </div>
                            <button
                                className="text-2xl text-center cursor-pointer self-start"
                                onClick={toggle}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="pt-2 break-normal">
                                {props.body}
                            </div>
                        </div>

                        {props.ownerUsername === localStorage.getItem("username")
                        || localStorage.getItem("role") === "ADMIN" ? (
                            <div className="justify-end w-full flex flex-row gap-x-3 pt-3">
                                <a
                                    className="text-violet-600 cursor-pointer hover:underline"
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
                        ) : null}

                        <div className="py-6 font-medium text-base">
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