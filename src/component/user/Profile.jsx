import React, {useState} from "react"
import Post from "../post/Post.jsx"
import CreatePost from "../post/CreatePost.jsx"
import FollowButton from "./FollowButton.jsx"
import useProfile from "./useProfile.js"
import Loading from "../util/Loading.jsx"
import ShowMoreButton from "../util/ShowMoreButton.jsx"

export default function Profile() {

    const [page, setPage] = useState(0)
    const [followingModal, setFollowingModal] = useState(false)
    const [followersModal, setFollowersModal] = useState(false)
    const {
        profileData,
        posts,
        profileLoading,
        postsLoading,
        hasMore,
        getUser,
        addNewPost,
        toggleEdit,
        updateNumberOfFollowers
    } = useProfile(page)

    function handleShowMore() {
        setPage((prevPageNumber) => prevPageNumber + 1)
    }

    function toggleFollowingModal() {
        setFollowingModal(!followingModal)
    }

    function toggleFollowersModal() {
        setFollowersModal(!followersModal)
    }

    return (
        <div className="flex w-full justify-center">
            <div className="flex flex-col w-11/12 md:w-3/5">
                <section className="flex flex-col bg-[#F6F6F6] rounded px-1 md:px-6 py-6 gap-y-3">
                    {profileLoading ? <Loading/> : (
                        <>
                            <div className="flex flex-col p-3 gap-y-3 gap-x-6 border-b">
                                <div className="flex flex-row justify-between">
                                    <img
                                        src={profileData.avatarUrl}
                                        alt={"User avatar..."}
                                        className="rounded-full h-32 w-32 hover:cursor-pointer hover:grayscale-[50%]
                                        duration-300"
                                    />
                                    <div className="flex items-end">
                                        {profileData.username !== getUser().username ? (
                                            <FollowButton
                                                profileData={profileData}
                                                updateNumberOfFollowers={updateNumberOfFollowers}
                                            />
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
                                    </div>
                                </div>
                                <div className="flex flex-col w-full">
                                    <div>
                                        <h1 className="font-medium text-3xl">{profileData.username}</h1>
                                        <span className="text-md">{profileData.email}</span>
                                        <p className="font-thin py-3 italic">{profileData.bio}</p>
                                    </div>
                                    <div className="flex gap-x-3 flex-wrap">
                                        <button
                                            className="hover:cursor-pointer hover:underline decoration-1"
                                        >
                                            <span className="font-bold">{profileData.numberOfFollowing}</span> Following
                                        </button>
                                        <button
                                            className="hover:cursor-pointer hover:underline decoration-1"
                                        >
                                            <span className="font-bold">{profileData.numberOfFollowers}</span> Followers
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-3 mt-3">
                                {profileData.username === getUser().username && <CreatePost addNewPost={addNewPost}/>}
                                <div className="flex flex-col gap-y-3">
                                    {posts.length === 0 && (
                                        <span className="w-full text-center font-light text-sm md:text-lg">
                                            {profileData.username} hasn't posted anything yet.
                                        </span>
                                    )}
                                    {posts.map(post => (
                                        <Post key={post.id} post={post}/>
                                    ))}
                                    {hasMore && <ShowMoreButton handleShowMore={handleShowMore}/>}
                                    {postsLoading && <Loading/>}
                                </div>
                            </div>
                        </>
                    )}
                </section>
            </div>
        </div>
    )
}