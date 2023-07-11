import {useContext, useEffect, useState} from "react";
import appUserService from "../../api/AppUserApi.js";
import postService from "../../api/PostApi.js";
import {AuthContext} from "../security/AuthContext.js";

export default function useProfile(page) {

    const PAGE_SIZE = 5
    const { logout, getUser } = useContext(AuthContext)
    const [hasMore, setHasMore] = useState(false)
    const [profileLoading, setProfileLoading] = useState(false)
    const [postsLoading, setPostsLoading] = useState(false)
    const urlParams = new URLSearchParams(window.location.search)
    const username = urlParams.get("username")
    const [isEditable, setIsEditable] = useState(false)
    const [posts, setPosts] = useState([])
    const [profileData, setProfileData] = useState({
        id: null,
        username: null,
        email: null,
        bio: null,
        avatarUrl: null,
        followers: [],
        following: []
    })
    const [followStats, setFollowStats] = useState({
        numberOfFollowers: 0,
        numberOfFollowing: 0
    })

    //  Profile
    useEffect(() => {
        setProfileLoading(true)
        appUserService.getAppUserByUsername(username)
            .then(response => {
                setProfileData(response.data)
            })
            .catch(error => {
                if (error.response.status === 401) {
                    logout()
                }
                console.log(error.response.status + ": " + error.response.data.message)
            })
            .finally(() => setProfileLoading(false))
    }, [username])

    //  Posts
    useEffect(() => {
        setPostsLoading(true)
        postService.getAllPostsByUsername(username, page, PAGE_SIZE)
            .then(response => {
                setPosts((prevPosts) => {
                    return [...new Set([...prevPosts, ...response.data])]
                })
                setHasMore(response.data.length > 0)
            })
            .catch(error => {
                if (error.response.status === 401) {
                    logout()
                }
                console.log(error.response.status + ": " + error.response.data.message)
            })
            .finally(() => setPostsLoading(false))
    }, [username, page])

    useEffect(() => {
        setFollowStats({
            numberOfFollowers: profileData.followers.length,
            numberOfFollowing: profileData.following.length
        })
    }, [profileData.followers, profileData.following])

    const updateNumberOfFollowers = (amount) => {
        setFollowStats({
            ...followStats, numberOfFollowers: followStats.numberOfFollowers + amount
        })
    }

    const addNewPost = (newPost) => {
        setPosts([newPost, ...posts])
    }

    const toggleEdit = () => {
        setIsEditable(!isEditable)
    }

    const updateProfile = () => {
        toggleEdit()
    }

    return {
        profileData,
        followStats,
        posts,
        profileLoading,
        postsLoading,
        hasMore,
        isEditable,
        getUser,
        addNewPost,
        updateProfile,
        toggleEdit,
        updateNumberOfFollowers
    }
}