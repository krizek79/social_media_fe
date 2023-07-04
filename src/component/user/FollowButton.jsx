import React, {useEffect, useState} from "react"
import followService from "../../service/FollowService.js"
import authService from "../../service/AuthService.js"
import {useNavigate} from "react-router-dom"

export default function FollowButton(props) {

    const navigate = useNavigate()
    const [followedByCurrentUser, setFollowedByCurrentUser] = useState(false)

    useEffect(() => {
        const isFollowedByCurrentUser = props.profileData.followers.some(
            follow => follow.follower === localStorage.getItem("username")
        )
        setFollowedByCurrentUser(isFollowedByCurrentUser)
    }, [props.profileData.followers])

    function handleFollow() {
        if (followedByCurrentUser) {
            unfollow()
        } else {
            follow()
        }
    }

    function follow() {
        followService
            .follow(props.profileData.id)
            .then(response => {
                if (response.status === 200) {
                    setFollowedByCurrentUser(true)
                    props.updateNumberOfFollowers(1)
                }
            })
            .catch(e => {
                if (e.response.status === 401) {
                    authService.logout()
                    navigate("/authentication")
                }
                console.log(e.response.status + ": " + e.response.data.message)
            })
    }

    function unfollow() {
        followService
            .unfollow(props.profileData.id)
            .then(response => {
                if (response.status === 200) {
                    setFollowedByCurrentUser(false)
                    props.updateNumberOfFollowers(-1)
                }
            })
            .catch(e => {
                if (e.response.status === 401) {
                    authService.logout()
                    navigate("/authentication")
                }
                console.log(e.response.status + ": " + e.response.data.message)
            })
    }

    return (
        <>
            <button
                className={`border-2 border-black py-1.5 px-6 rounded-lg 
                ${followedByCurrentUser ? "bg-white text-black hover:bg-gray-100" : "bg-black text-white hover:bg-gray-900"}`}
                onClick={handleFollow}
            >
                {followedByCurrentUser ? <>Following</> : <>Follow</>}
            </button>
        </>
    )
}
