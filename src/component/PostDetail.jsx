import React, {useEffect, useState} from "react";
import postService from "../service/PostService.js";
import authService from "../service/AuthService.js";
import {useNavigate} from "react-router-dom";
import commentService from "../service/CommentService.js";
import CreateComment from "./CreateComment.jsx";
import Comment from "./Comment.jsx";
import LoadingModal from "./LoadingModal.jsx";

export default function PostDetail() {

    const urlParams = new URLSearchParams(window.location.search)
    const postId = urlParams.get("id")
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [isEditable, setIsEditable] = useState(false)
    const [post, setPost] = useState({
        id: postId,
        owner: {
            id: 0,
            username: "",
            email: "",
            bio: "",
            numberOfPosts: 0,
            avatarUrl: ""
        },
        body: "",
        createdAt: null,
        numberOfComments: 0
    })
    const [comments, setComments] = useState([])
    const [postUpdateRequest, setPostUpdateRequest] = useState({
        body: ""
    })

    useEffect(() => {
        if (!localStorage.getItem("authenticationToken")) {
            authService.logout()
            navigate("/authentication")
        }
        setLoading(true)

        postService.getPostById(postId)
            .then(response => {
                if (response.status === 200) {
                    setPost(response.data)
                    setPostUpdateRequest({
                        body: response.data.body
                    })
                }
            })
            .catch(e => {
                if (e.response.status === 401) {
                    authService.logout()
                    navigate("/authentication")
                }
                console.log(e.response.status + ": " + e.response.data.message)
            })

        commentService.getAllCommentsByPostId(postId)
            .then(response => {
                if (response.status === 200) {
                    const reversedComments = response.data.reverse()
                    setComments(reversedComments)
                    setLoading(false)
                }
            })
            .catch(e => {
                setLoading(false)
                if (e.response.status === 401) {
                    authService.logout()
                    navigate("/authentication")
                }
                console.log(e.response.status + ": " + e.response.data.message)
            })
    }, [postId])

    function updatePost() {
        setLoading(true)
        postService.updatePost(postId, postUpdateRequest)
            .then(response => {
                if (response.status === 200) {
                    setPostUpdateRequest({
                        body: response.data.body
                    })
                    setPost(response.data)
                    toggleEdit()
                    setLoading(false)
                }
            })
            .catch(e => {
                setLoading(false)
                if (e.response.status === 401) {
                    navigate("/authentication")
                }
                console.log(e.response.status + ": " + e.response.data.message)
            })
    }

    function deletePost() {
        setLoading(true)
        postService.deletePost(postId)
            .then(response => {
                if (response.status === 200) {
                    setLoading(false)
                    navigate("/")
                }
            })
            .catch(e => {
                setLoading(false)
                if (e.response.status === 401) {
                    navigate("/authentication")
                }
            })
    }

    function addNewComment(newComment) {
        setComments([newComment, ...comments]);
    }

    function toggleEdit() {
        if (isEditable) {
            setPostUpdateRequest({
                body: postUpdateRequest.body
            })
        }
        setIsEditable(!isEditable)
    }

    function formatBody(body) {
        const urlRegex = /(https?:\/\/\S+)/g
        return body.replace(urlRegex, url => {
            return `
                <a 
                    href="${url}" target="_blank" rel="noopener noreferrer" 
                    class="text-blue-500 hover:underline break-all"
                >
                    ${url}
                </a>
            `
        })
    }

    function handleChange(e) {
        setPostUpdateRequest({...postUpdateRequest, [e.target.name]: e.target.value})
    }

    return (
        <>
            <main className="bg-gradient-to-b from-gray-900 to-gray-700 flex">
                <div
                    className="flex-col overflow-y-auto mx-auto w-11/12 md:w-3/5 m-6 py-6 px-3 bg-white rounded
                    shadow-md md:p-6"
                >
                    {post.owner.username === localStorage.getItem("username")
                    || localStorage.getItem("role") === "ADMIN" ? (
                        <div className="justify-end w-full flex flex-row gap-x-3 pt-3">
                            {isEditable ? (
                                <div className="flex flex-row gap-x-3">
                                    <button
                                        className="hover:text-green-500"
                                        onClick={updatePost}
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                        </svg>
                                    </button>
                                    <button
                                        className="hover:text-red-500"
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
                                        className="hover:text-violet-500"
                                        onClick={toggleEdit}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                        </svg>
                                    </button>
                                    <button
                                        className="hover:text-red-500"
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

                    <div className="flex justify-between border-b pb-3">
                        <div className="flex flex-row gap-x-3">
                            <img
                                src={post.owner.avatarUrl}
                                alt={"User avatar..."}
                                className="rounded object-scale-down h-12 w-12 hover:cursor-pointer
                                hover:grayscale-[50%] duration-300"
                                onClick={() => navigate("/profile?username=" + post.owner.username)}
                            />
                            <div
                                className="gap-y-1/2 flex flex-col"
                            >
                                <a
                                    className="font-medium text-lg hover:cursor-pointer hover:underline"
                                    href={"/profile?username=" + post.owner.username}
                                >
                                    {post.owner.username}
                                </a>
                                <div className="font-normal text-xs">
                                    {post.createdAt}
                                </div>
                            </div>
                        </div>
                    </div>
                    {isEditable ? (
                        <textarea
                            name="body"
                            value={postUpdateRequest.body}
                            onChange={handleChange}
                            className="mb-2 block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md
                            focus:border-blue-700 focus:ring-blue-300 focus:outline-none focus:ring
                            focus:ring-opacity-40"
                            rows={4}
                        >
                            {postUpdateRequest.body}
                        </textarea>
                    ) : (
                        <div className="p-3 bg-gray-100">
                            <div
                                className="break-normal"
                                dangerouslySetInnerHTML={{ __html: formatBody(post.body) }}
                            ></div>
                        </div>
                    )}

                    <div className="flex flex-col py-3 text-base gap-y-3">
                        <div className="flex w-full gap-x-6">
                            <button className="hover:cursor-pointer hover:text-red-500 flex gap-x-3 items-center">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path>
                                </svg>
                                <span>0</span>
                            </button>
                            <button className="hover:cursor-pointer hover:text-blue-500 flex gap-x-3 items-center">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"></path>
                                </svg>
                                <span>{post.numberOfComments}</span>
                            </button>
                        </div>
                        <CreateComment
                            postId={postId}
                            parentComment={null}
                            addNewComment={addNewComment}
                        />
                        <div className="flex flex-col gap-y-3">
                            {comments.map(comment => (
                                <Comment
                                    key={comment.id}
                                    comment={comment}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {loading && (
                <LoadingModal/>
            )}
        </>
    )
}