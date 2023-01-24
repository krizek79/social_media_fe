import React, {useEffect, useState} from "react"
import postService from "../service/PostService.js"
import Post from "./Post";

export default function Body() {

    const [posts, setPosts] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)

    }, [])

    return (
        <main className="bg-gradient-to-b from-gray-900 to-gray-700 flex gap-x-1">
            <div
                className="flex-col overflow-y-auto mx-auto w-11/12 md:w-3/5 m-6 p-6 bg-white rounded shadow-md"
            >
                <section className="flex flex-col gap-y-3">
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                </section>
            </div>
        </main>
    )
}