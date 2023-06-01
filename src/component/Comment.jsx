import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateComment from "./CreateComment.jsx";

export default function Comment({ comment }) {

    const navigate = useNavigate()
    const [showCreateComment, setShowCreateComment] = useState(false)
    const [showChildComments, setShowChildComments] = useState(false)
    const [childComments, setChildComments] = useState(comment.childComments || [])

    function formatDate(date) {
        return new Date(date).toLocaleString()
    }

    function renderChildComments() {
        if (!showChildComments || !childComments || childComments.length === 0) {
            return null
        }

        return (
            <div className="ml-3 mt-3">
                {childComments.map((childComment) => (
                    <Comment key={childComment.id} comment={childComment} />
                ))}
            </div>
        )
    }

    function addNewComment(newComment) {
        setChildComments([...childComments, newComment])
        toggleReply()
    }

    function toggleReply() {
        setShowCreateComment(!showCreateComment)
    }

    function toggleChildComments() {
        setShowChildComments(!showChildComments)
    }

    return (
        <div className="border p-3">
            <div className="border-solid border-0 border-b border-blue-600 pb-2 flex flex-row gap-x-3">
                <img
                    src={comment.author.avatarUrl}
                    alt="User avatar..."
                    className="rounded object-scale-down h-10 w-10 hover:cursor-pointer hover:grayscale-[50%] duration-300"
                    onClick={() => navigate(`/profile?username=${comment.author.username}`)}
                />
                <div className="flex flex-col">
                    <a
                        className="font-medium text-base hover:cursor-pointer hover:underline"
                        href={`/profile?username=${comment.author.username}`}
                    >
                        {comment.author.username}
                    </a>
                    <div className="font-normal text-xs">{formatDate(comment.createdAt)}</div>
                </div>
            </div>
            <div className="pt-2 break-normal">{comment.body}</div>
            <div className="flex w-full pt-3 justify-between">
                <div className="flex gap-x-6">
                    <button className="hover:cursor-pointer hover:text-red-500 flex gap-x-3 items-center">
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            ></path>
                        </svg>
                        <span>0</span>
                    </button>
                    <button
                        className="hover:cursor-pointer hover:text-blue-500 flex gap-x-3 items-center"
                        onClick={toggleChildComments}
                    >
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                            ></path>
                        </svg>
                        <span>{childComments.length}</span>
                    </button>
                    <button className="hover:cursor-pointer hover:text-blue-500" onClick={toggleReply}>
                        Reply
                    </button>
                </div>
                {comment.author.username === localStorage.getItem("username")
                || localStorage.getItem("role") === "ADMIN" ? (
                    <div>
                        <button
                            className="hover:text-red-500"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                        </button>
                    </div>
                ) : null}
            </div>
            {showCreateComment && (
                <div className="ml-4 mt-3">
                    <CreateComment postId={comment.postId} parentCommentId={comment.id} addNewComment={addNewComment} />
                </div>
            )}
            {renderChildComments()}
        </div>
    )
}
