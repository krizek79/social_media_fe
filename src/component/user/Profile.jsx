import appUserService from "../../service/AppUserService.js"
import React, {useEffect, useState} from "react"
import LoadingModal from "../util/LoadingModal.jsx";
import {useNavigate} from "react-router-dom";
import postService from "../../service/PostService.js";
import Post from "../post/Post.jsx";
import CreatePost from "../post/CreatePost.jsx";
import FollowButton from "./FollowButton.jsx";

export default function Profile() {

    const navigate = useNavigate()
    const urlParams = new URLSearchParams(window.location.search)
    const username = urlParams.get("username")
    const [isEditable, setIsEditable] = useState(false)
    const [loading, setLoading] = useState(true)
    const [profileData, setProfileData] = useState({
        id: null,
        username: null,
        email: null,
        bio: null,
        avatarUrl: null,
        followers: [],
        following: []
    })
    const [followStats, setFollowStats] = useState({
        numberOfFollowers: 0,
        numberOfFollowing: 0
    })
    const [posts, setPosts] = useState([])

    useEffect(() => {
        setLoading(true)

        appUserService.getAppUserByUsername(username)
            .then(response => {
                setProfileData(response.data)
            })
            .catch(error => {
                if (error.response.status === 401) {
                    navigate("/authentication")
                }
                console.log(error.response.status + ": " + error.response.data.message)
            })

        postService.getAllPostsByUsername(username)
            .then(response => {
                setLoading(false)
                const reversedPosts = response.data.reverse()
                setPosts(reversedPosts)
            })
            .catch(error => {
                setLoading(false)
                if (error.response.status === 401) {
                    navigate("/authentication")
                }
                console.log(error.response.status + ": " + error.response.data.message)
            })
    }, [username])

    useEffect(() => {
        setFollowStats({
            numberOfFollowers: profileData.followers.length,
            numberOfFollowing: profileData.following.length
        })
    }, [profileData.followers, profileData.following])

    function updateNumberOfFollowers(amount) {
        setFollowStats({
            ...followStats, numberOfFollowers: followStats.numberOfFollowers + amount
        })
    }

    function addNewPost(newPost) {
        setPosts([newPost, ...posts])
    }

    function toggleEdit() {
        setIsEditable(!isEditable)
    }

    function updateProfile() {

    }

    return (
        <main className="bg-gradient-to-b from-gray-900 to-gray-700 flex">
            <div
                className="flex-col overflow-y-auto mx-auto w-11/12 md:w-3/5 m-6 py-6 bg-white rounded shadow-md
                md:p-6"
            >
                <div className="flex flex-col p-3 gap-y-3 gap-x-6 border-b">
                    <div className="flex flex-row justify-between">
                        <img
                            src={profileData.avatarUrl}
                            alt={"User avatar..."}
                            className="rounded-full h-24 w-24 hover:cursor-pointer hover:grayscale-[50%] duration-300"
                        />
                        <div className="flex items-end">
                            {profileData.username !== localStorage.getItem("username") ? (
                                <FollowButton
                                    profileData={profileData}
                                    updateNumberOfFollowers={updateNumberOfFollowers}
                                />
                            ) : (
                                <>
                                    {isEditable ? (
                                        <div className="flex gap-x-3">
                                            <button
                                                className="hover:text-green-500"
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
                                        <button
                                            className="hover:text-violet-500"
                                            onClick={toggleEdit}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                            </svg>
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        {isEditable ? (
                            <>
                                ...
                            </>
                        ) : (
                            <>
                                <h1 className="font-medium text-3xl">{profileData.username}</h1>
                                <span className="text-md">{profileData.email}</span>
                                <p className="font-thin py-3 italic">{profileData.bio}</p>
                            </>
                        )}
                        <div className="flex gap-x-3 flex-wrap">
                            <span>
                                <span className="font-bold">{followStats.numberOfFollowing}</span> Following
                            </span>
                            <span>
                                <span className="font-bold">{followStats.numberOfFollowers}</span> Followers
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-y-3 mt-3">
                    {localStorage.getItem("username") === username && (
                        <CreatePost addNewPost={addNewPost}/>
                    )}
                    <div className="flex flex-col gap-y-3">
                        {posts.map(post => (
                            <Post
                                key={post.id}
                                post={post}
                            />
                        ))}
                        {posts.length === 0 && (
                            <span className="w-full text-center font-light text-sm md:text-lg">
                                {profileData.username} hasn't posted anything yet.
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {loading && (
                <LoadingModal/>
            )}
        </main>
    )
}