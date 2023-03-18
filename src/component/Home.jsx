import CreatePost from "./CreatePost.jsx"
import Post from "./Post.jsx"
import React, {useEffect, useState} from "react"
import postService from "../service/PostService.js"
import {useNavigate} from "react-router-dom";
import authService from "../service/AuthService.js";
import LoadingModal from "./LoadingModal";

export default function Home() {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    function addNewPost(newPost) {
        setPosts([newPost, ...posts]);
    }

    function deletePost(postId) {
        setPosts(posts.filter(post => post.id !== postId))
    }

    function updatePost(updatedPost) {
        setPosts(posts.map(post => {
            if (post.id === updatedPost.id) {
                return updatedPost;
            } else {
                return post;
            }
        }))
    }

    useEffect(() => {
        setLoading(true)
        postService.getAllPosts()
            .then(response => {
                const reversedPosts = response.data.reverse()
                setPosts(reversedPosts)
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
                    <section className="flex-col">
                        <CreatePost addNewPost={addNewPost}/>
                        <div className="flex flex-col gap-y-3">
                            {posts.map(post => (
                                <Post
                                    key={post.id}
                                    id={post.id}
                                    owner={post.owner}
                                    body={post.body}
                                    createdAt={post.createdAt}
                                    deletePost={deletePost}
                                    updatePost={updatePost}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </main>
    )
}