import CreatePost from "./CreatePost.jsx";
import Post from "./Post.jsx";
import React, {useEffect, useState} from "react";
import postService from "../service/PostService.js";

export default function Home() {

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
        <div
            className="flex-col overflow-y-auto mx-auto w-11/12 md:w-3/5 m-6 px-1 py-6 bg-white rounded shadow-md
                md:p-6"
        >
            <section className="flex flex-col gap-y-3">
                <CreatePost/>
                <Post
                    key={1}
                    ownerUsername={"Alibaba"}
                    body={"aejekbkigbalifbalwi bfialbgkaeblguabgualebg ilaebvgliebaglnoaelngliea"}
                    createdAt={"MM:HH DD/MM/YYYY"}
                />
                <Post
                    key={2}
                    ownerUsername={"Master Shifu"}
                    body={"naôlngilngilrniialbgk aeblguabgualebgilaebvglieb aglnoafsefsfesfeselngliea"}
                    createdAt={"MM:HH DD/MM/YYYY"}
                />
            </section>

            {loading ? (
                <div className="text-center p-6">
                    Loading...
                </div>
            ) : (
                <section className="flex flex-col gap-y-3">
                    <CreatePost/>
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
    )
}