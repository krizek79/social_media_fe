import React, {useContext, useEffect, useRef, useState} from "react"
import postService from "../../api/PostApi.js"
import {useNavigate} from "react-router-dom"
import CommentSection from "../comment/CommentSection.jsx"
import PostLikeButton from "./PostLikeButton.jsx"
import Loading from "../util/Loading.jsx"
import {AuthContext} from "../security/AuthContext.js"

export default function PostDetail() {

    const { logout, getUser } = useContext(AuthContext)
    const urlParams = new URLSearchParams(window.location.search)
    const postId = urlParams.get("id")
    const navigate = useNavigate()
    const textareaRef = useRef(null)
    const [isEditable, setIsEditable] = useState(false)
    const [post, setPost] = useState(null)
    const [request, setRequest] = useState({
        body: ""
    })

    useEffect(() => {
        postService.getPostById(postId)
            .then(response => {
                if (response.status === 200) {
                    setPost(response.data)
                    setRequest({
                        body: response.data.body
                    })
                }
            })
            .catch(e => {
                if (e.response.status === 401) {
                    logout()
                }
                console.log(e.response ? `${e.response.status}: ${e.response.data.message}` : e.message)
            })
    }, [postId])

    function updatePost() {
        postService.updatePost(postId, request)
            .then(response => {
                if (response.status === 200) {
                    setRequest({
                        body: response.data.body
                    })
                    setPost(response.data)
                    toggleEdit()
                }
            })
            .catch(e => {
                if (e.response.status === 401) {
                    logout()
                }
                console.log(e.response.status + ": " + e.response.data.message)
            })
    }

    function deletePost() {
        postService.deletePost(postId)
            .then(response => {
                if (response.status === 200) {
                    navigate("/")
                }
            })
            .catch(e => {
                if (e.response.status === 401) {
                    logout()
                }
                console.log(e.response.status + ": " + e.response.data.message)
            })
    }

    function formatDate(date) {
        return new Date(date).toLocaleString()
    }

    function toggleEdit() {
        if (isEditable) {
            setRequest({
                body: request.body
            })
        }
        setIsEditable(!isEditable)
    }

    function formatBody(body) {
        const urlRegex = /(https?:\/\/\S+)/g
        const lineBreakRegex = /\n/g
        const bodyWithLineBreaks = body.replace(lineBreakRegex, "<br>")

        return bodyWithLineBreaks.replace(urlRegex, url => {
            return `
            <a 
                href="${url}" target="_blank" rel="noopener noreferrer" 
                class="text-blue-600 hover:underline break-all"
            >
                ${url}
            </a>
        `
        })
    }

    function addLike(like) {
        const updatedPost = { ...post, likes: [...post.likes, like] }
        setPost(updatedPost)
    }

    function removeLike(like) {
        const updatedLikes = post.likes.filter(likedBy => likedBy.id !== like.id)
        const updatedPost = { ...post, likes: updatedLikes }
        setPost(updatedPost)
    }

    function handleChange(e) {
        setRequest({...request, [e.target.name]: e.target.value})
    }

    function handleTextareaResize() {
        const textarea = textareaRef.current
        textarea.style.height = "auto"
        textarea.style.height = `${textarea.scrollHeight}px`
    }

    return (
        <div className="flex w-full justify-center">
            <div className="flex flex-col w-11/12 md:w-3/5">
                <section className="flex flex-col bg-[#F6F6F6] rounded px-3 md:px-6 py-6 gap-y-3">
                    {!post ? <Loading/> : (
                        <>
                            {post.author.username === getUser().username || getUser().role === "ADMIN" ? (
                                <div className="justify-end w-full flex flex-row gap-x-3 px-3">
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
                            <div className="flex justify-between pb-3">
                                <div className="flex flex-row gap-x-3">
                                    <img
                                        src={post.author.avatarUrl}
                                        alt={"User avatar..."}
                                        className="rounded-full object-scale-down h-12 w-12 hover:cursor-pointer
                                        hover:grayscale-[50%] duration-300"
                                        onClick={() => navigate("/profile?username=" + post.author.username)}
                                    />
                                    <div className="gap-y-1/2 flex flex-col">
                                        <a
                                            className="font-medium text-lg hover:cursor-pointer hover:underline"
                                            href={"/profile?username=" + post.author.username}
                                        >
                                            {post.author.username}
                                        </a>
                                        <div className="font-normal text-xs">
                                            {formatDate(post.createdAt)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {isEditable ? (
                                    <textarea
                                        rows={3}
                                        ref={textareaRef}
                                        name="body"
                                        value={request.body}
                                        className="mb-2 block w-full px-4 py-2 mt-2 text-black bg-white border
                                        rounded-md overflow-y-hidden focus:border-[#0F044C] focus:ring-[#141E61]
                                        focus:outline-none focus:ring focus:ring-opacity-40"
                                        onChange={(e) => {
                                            handleChange(e)
                                            handleTextareaResize()
                                        }}
                                    >
                                        {request.body}
                                    </textarea>
                            ) : (
                                <div className="bg-white p-3">
                                    <div
                                        className="break-normal"
                                        dangerouslySetInnerHTML={{ __html: formatBody(post.body) }}
                                    ></div>
                                </div>
                            )}

                            <div className="flex flex-col py-3 text-base gap-y-3 px-3 md:px-0">
                                <div className="flex w-full gap-x-6">
                                    <PostLikeButton
                                        post={post}
                                        addLike={addLike}
                                        removeLike={removeLike}
                                    />
                                    <span>Comments ({post.numberOfComments})</span>
                                </div>
                            </div>
                            <CommentSection postId={postId}/>
                        </>
                    )}
                </section>
            </div>
        </div>
    )
}