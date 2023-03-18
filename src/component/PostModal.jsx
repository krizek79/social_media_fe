import React, {useState} from "react";
import postService from "../service/PostService.js";
import LoadingModal from "./LoadingModal.jsx";
import ErrorNotification from "./ErrorNotification.jsx";
import {useNavigate} from "react-router-dom";

export default function PostModal(props) {

    const navigate = useNavigate()
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
                props.deletePost(props.id)
                toggle()
            })
            .catch(e => {
                setError(e.response.data.message)
                setLoading(false)
            })
    }

    function toggleEdit() {
        if (isEditable) {
            setRequest({
                body: request.body
            })
        }
        setIsEditable(!isEditable)
    }

    function updatePost() {
        setLoading(true)
        setError(null)
        postService.updatePost(props.id, request)
            .then(response => {
                setLoading(false)
                props.updatePost(response.data)
                setRequest({
                    body: response.data.body
                })
                toggleEdit()
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
                className="justify-center items-center flex flex-col fixed inset-0 z-50 outline-none
                focus:outline-none w-full rounded-md w-full"
            >
                <div
                    className="sm:px-6 p-6 pt-3 bg-white rounded-md shadow-md overflow-y-auto w-11/12 lg:w-2/3"
                >
                    <div className={"flex justify-between border-b pb-3"}>
                        <div className="flex flex-row gap-x-3">
                            <img
                                src={props.owner.avatarUrl}
                                alt={"User avatar..."}
                                className="rounded object-scale-down h-12 w-12 hover:cursor-pointer hover:rounded-lg
                                ease-in duration-200"
                                onClick={() => navigate("/profile?username=" + props.owner.username)}
                            />
                            <div
                                className="gap-y-1/2 flex flex-col"
                            >
                                <div
                                    className="font-medium text-lg hover:cursor-pointer"
                                    onClick={() => navigate("/profile?username=" + props.owner.username)}
                                >
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
                                    <button
                                        className="flex p-1 bg-green-500 rounded-md hover:rounded-lg
                                            hover:bg-green-600 transition-all duration-300 text-white"
                                        onClick={updatePost}
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                        </svg>
                                    </button>
                                    <button
                                        className="flex p-1 bg-red-500 rounded-md hover:rounded-lg
                                            hover:bg-red-600 transition-all duration-300 text-white"
                                        onClick={toggleEdit}
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-row gap-x-3">
                                    <button
                                        className="flex p-1 bg-purple-500 rounded-md hover:rounded-lg
                                        hover:bg-purple-600 transition-all duration-300 text-white"
                                        onClick={toggleEdit}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                        </svg>
                                    </button>
                                    <button
                                        className="flex p-1 bg-red-500 rounded-md hover:rounded-lg
                                            hover:bg-red-600 transition-all duration-300 text-white"
                                        onClick={deletePost}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : null}

                    <div className="py-3 font-medium text-base">
                        Comments (999)
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