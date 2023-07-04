import CreatePost from "../post/CreatePost.jsx"
import Post from "../post/Post.jsx"
import React, {useEffect, useState} from "react"
import postService from "../../service/PostService.js"
import {useNavigate} from "react-router-dom";
import authService from "../../service/AuthService.js";
import LoadingModal from "../util/LoadingModal.jsx";

export default function Home() {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    function addNewPost(newPost) {
        setPosts([newPost, ...posts])
    }

    useEffect(() => {
        if (!localStorage.getItem("authenticationToken")) {
            navigate("/authentication")
        }
        setLoading(true)

        postService.getAllPosts()
            .then(response => {
                const reversedPosts = response.data.reverse()
                setPosts(reversedPosts)
                setLoading(false)
            })
            .catch(e => {
                if (e.response.status === 401) {
                    authService.logout()
                    navigate("/authentication")
                } else {
                    console.log(e.response.status + ": " + e.response.data.message)
                }
                setLoading(false)
            })
    }, [])

    return (
        <main className="bg-gradient-to-b from-gray-900 to-gray-700 flex">
            <div
                className="flex-col overflow-y-auto mx-auto w-11/12 md:w-3/5 m-6 px-1 py-6 bg-white rounded shadow-md
                md:p-6"
            >
                {loading ? (
                    <LoadingModal/>
                ) : (
                    <section className="flex flex-col gap-y-3">
                        <CreatePost addNewPost={addNewPost}/>
                        <div className="flex flex-col gap-y-3">
                            {posts.map(post => (
                                <Post
                                    key={post.id}
                                    post={post}
                                />
                            ))}
                        </div>
                        <div className="flex w-full justify-center mt-6 mb-3">
                            <button className="text-blue-500 hover:underline">
                                Show more
                            </button>
                        </div>
                    </section>
                )}
            </div>
        </main>
    )
}