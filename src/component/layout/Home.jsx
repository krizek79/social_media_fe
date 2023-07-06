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
        <main className="bg-gradient-to-b from-gray-900 to-gray-700 flex">
            <div
                className="flex-col overflow-y-auto mx-auto w-11/12 md:w-3/5 m-6 px-1 py-6 bg-white rounded shadow-md
                md:p-6"
            >
                <section className="flex flex-col gap-y-3">
                    <CreatePost addNewPost={addNewPost} />
                    <div className="flex flex-col gap-y-3">
                        {posts.length === 0 && !loading && (
                            <span className="w-full text-center font-light text-sm md:text-lg">
                                There is nothing to show
                            </span>
                        )}
                        {posts.map((post) => (
                            <Post key={post.id} post={post} />
                        ))}
                        {hasMore && (
                            <ShowMoreButton handleShowMore={handleShowMore}/>
                        )}
                        {loading && (
                            <Loading/>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}
