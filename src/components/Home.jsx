import CreatePost from "./CreatePost.jsx"
import Post from "./Post.jsx"
import React, {useEffect, useState} from "react"
import postService from "../service/PostService.js"
import {useNavigate} from "react-router-dom";
import authService from "../service/AuthService.js";

export default function Home() {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    async function getAllPosts() {
        return await postService.getAllPosts()
    }

    useEffect(() => {
        getAllPosts()
            .then(response => {
                setPosts(response.data)
                setLoading(false)
            })
            .catch(e => {
                if (e.response.status === 401) {
                    console.log("401 Unauthorized")
                    authService.logout()
                    navigate("/login")
                } else {
                    console.log(e.response.status + ": " + e.response.data.message)
                }
            })
    }, [])

    return (
        <main className="bg-gradient-to-b from-gray-900 to-gray-700 flex">
            <div
                className="flex-col overflow-y-auto mx-auto w-11/12 md:w-3/5 m-6 px-1 py-6 bg-white rounded shadow-md
                md:p-6"
            >
                {loading ? (
                    <div className="text-center p-6 animate-pulse">
                        Loading...
                    </div>
                ) : (
                    <section className="flex-col">
                        <CreatePost/>
                        <div className="flex flex-col-reverse gap-y-3">
                            {posts.map(post => (
                                <Post
                                    key={post.id}
                                    ownerUsername={post.ownerUsername}
                                    body={post.body}
                                    createdAt={post.createdAt}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </main>
    )
}