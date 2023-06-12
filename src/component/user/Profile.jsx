import appUserService from "../../service/AppUserService.js"
import React, {useEffect, useState} from "react"
import LoadingModal from "../util/LoadingModal.jsx";
import {useNavigate} from "react-router-dom";
import postService from "../../service/PostService.js";
import Post from "../post/Post.jsx";
import CreatePost from "../post/CreatePost.jsx";

export default function Profile() {

    const navigate = useNavigate()
    const urlParams = new URLSearchParams(window.location.search)
    const username = urlParams.get("username")
    const [loading, setLoading] = useState(true)
    const [profileData, setProfileData] = useState({
        id: null,
        username: null,
        email: null,
        bio: null,
        avatarUrl: null
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

    function addNewPost(newPost) {
        setPosts([newPost, ...posts])
    }

    return (
        <main className="bg-gradient-to-b from-gray-900 to-gray-700 flex">
            <div
                className="flex-col overflow-y-auto mx-auto w-11/12 md:w-3/5 m-6 py-6 bg-white rounded shadow-md
                md:p-6"
            >
                <div className="flex flex-row p-3 gap-x-6 border-b">
                    <img
                        src={profileData.avatarUrl}
                        alt={"User avatar..."}
                        className="rounded-full h-24 w-24 hover:cursor-pointer"
                    />
                    <div className="flex flex-col w-full">
                        <h1 className="font-medium text-3xl">{profileData.username}</h1>
                        <span className="text-md">{profileData.email}</span>
                        <p className="font-thin py-3 italic">{profileData.bio}</p>
                    </div>
                </div>
                <div className="flex flex-col py-6">
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
                                This profile hasn't posted anything yet.
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