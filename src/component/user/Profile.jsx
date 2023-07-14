import React, {useState} from "react"
import Post from "../post/Post.jsx"
import CreatePost from "../post/CreatePost.jsx"
import FollowButton from "./FollowButton.jsx"
import useProfile from "./useProfile.js"
import Loading from "../util/Loading.jsx"
import ShowMoreButton from "../util/ShowMoreButton.jsx"
import PictureDialog from "../util/PictureDialog.jsx";
import EditProfileDialog from "./EditProfileDialog.jsx";

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
        formatBody,
        addNewPost,
        updateNumberOfFollowers
    } = useProfile(page)
    const profilePictureClasses = [
        "rounded-full",
        "h-32",
        "w-32",
        "hover:cursor-pointer",
        "hover:grayscale-[50%]",
        "duration-300"
    ]

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
                                    <PictureDialog
                                        src={profileData.avatarUrl}
                                        alt={"Profile picture"}
                                        classes={profilePictureClasses}
                                    />
                                    <div className="flex items-end">
                                        {profileData.username !== getUser().username ? (
                                            <FollowButton
                                                profileData={profileData}
                                                updateNumberOfFollowers={updateNumberOfFollowers}
                                            />
                                        ) : (
                                            <EditProfileDialog profileData={profileData}/>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col w-full">
                                    <div>
                                        <h1 className="font-medium text-3xl">{profileData.username}</h1>
                                        <span className="text-md">{profileData.email}</span>
                                        <p
                                            className="font-thin py-3 italic"
                                            dangerouslySetInnerHTML={{ __html: formatBody(profileData.bio) }}
                                        ></p>
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