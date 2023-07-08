import CreatePost from "../post/CreatePost.jsx";
import Post from "../post/Post.jsx";
import React, { useState } from "react";
import Loading from "../util/Loading.jsx";
import useHome from "./useHome.js";
import ShowMoreButton from "../util/ShowMoreButton.jsx";

export default function Home() {

    const [page, setPage] = useState(0)
    const { loading, posts, hasMore, updatePosts } = useHome(page)

    function addNewPost(newPost) {
        updatePosts([newPost])
    }

    function handleShowMore() {
        setPage((prevPageNumber) => prevPageNumber + 1)
    }

    return (
        <div className="flex w-full justify-center">
            <div className="flex flex-col w-11/12 md:w-3/5">
                <section className="flex flex-col bg-white rounded px-1 md:px-6 py-6 gap-y-3">
                    <CreatePost addNewPost={addNewPost} />
                    {posts.length === 0 && !loading && (
                        <span className="w-full text-center font-light text-sm md:text-lg">
                            There is nothing to show
                        </span>
                    )}
                    {posts.map((post) => (
                        <Post key={post.id} post={post} />
                    ))}
                    {hasMore && <ShowMoreButton handleShowMore={handleShowMore} />}
                    {loading && <Loading />}
                </section>
            </div>
        </div>
    )
}
