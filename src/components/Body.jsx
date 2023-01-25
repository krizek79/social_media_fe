import React, {useEffect, useState} from "react"
import postService from "../service/PostService.js"
import Post from "./Post";

export default function Body() {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    async function getAllPosts() {
        return await postService.getAllPosts()
    }

    useEffect(() => {
        getAllPosts().then(data => {
            setPosts(data.data)
            setLoading(false)
        })
    }, [])

    return (
        <main className="bg-gradient-to-b from-gray-900 to-gray-700 flex gap-x-1">
            <div
                className="flex-col overflow-y-auto mx-auto w-11/12 md:w-3/5 m-6 p-6 bg-white rounded shadow-md"
            >
                {loading ? (
                    <div className="text-center p-6">
                        Loading...
                    </div>
                ) : (
                    <section className="flex flex-col gap-y-3">
                        {posts.map(post => (
                            <Post
                                key={post.id}
                                ownerUsername={post.ownerUsername}
                                body={post.body}
                                createdAt={post.createdAt}
                            />
                        ))}
                    </section>
                )}
            </div>
        </main>
    )
}