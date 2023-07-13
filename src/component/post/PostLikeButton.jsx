import {useContext, useState} from "react"
import likeService from "../../api/LikeApi.js"
import {AuthContext} from "../security/AuthContext.js"

export default function PostLikeButton(props) {

    const { logout } = useContext(AuthContext)
    const [numberOfLikes, setNumberOfLikes] = useState(props.post.numberOfLikes)
    const [likedByCurrentUser, setLikedByCurrentUser] = useState(props.post.likedByCurrentUser)

    function handleLike(postId) {
        if (likedByCurrentUser) {
            unlikePost(postId)
        } else {
            likePost(postId)
        }
    }

    function likePost(postId) {
        likeService.likePost(postId)
            .then((response) => {
                if (response.status === 200) {
                    setLikedByCurrentUser(true)
                    setNumberOfLikes((previousValue) => previousValue + 1)
                }
            })
            .catch((e) => {
                if (e.response.status === 401) {
                    logout()
                }
                console.log(e.response.status + ": " + e.response.data.message)
            })
    }

    function unlikePost(postId) {
        likeService.unlikePost(postId)
            .then((response) => {
                if (response.status === 200) {
                    setLikedByCurrentUser(false)
                    setNumberOfLikes((previousValue) => previousValue - 1)
                }
            })
            .catch((e) => {
                if (e.response.status === 401) {
                    logout()
                }
                console.log(e.response.status + ": " + e.response.data.message)
            })
    }

    return (
        <>
            <button
                className={`hover:cursor-pointer hover:text-red-500 flex gap-x-3 items-center`}
                onClick={e => {
                    e.stopPropagation()
                    handleLike(props.post.id)
                }}
            >
                <svg
                    className={"h-5 w-5"}
                    fill={likedByCurrentUser ? "red" : "none"}
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
                <span>{numberOfLikes}</span>
            </button>
        </>
    )
}