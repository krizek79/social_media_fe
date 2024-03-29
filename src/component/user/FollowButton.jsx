import React, {useContext, useEffect, useState} from "react"
import followService from "../../api/FollowApi.js"
import {AuthContext} from "../security/AuthContext.js"

export default function FollowButton(props) {

    const { logout } = useContext(AuthContext)
    const [followedByCurrentUser, setFollowedByCurrentUser] = useState(props.profileData.followedByCurrentUser)


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
                    logout()
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
                    logout()
                }
                console.log(e.response.status + ": " + e.response.data.message)
            })
    }

    return (
        <>
            <button
                className={`border-2 border-black py-1.5 px-6 rounded-lg 
                ${followedByCurrentUser 
                    ? "text-black hover:bg-gray-200" 
                    : "bg-[#141E61] text-white hover:bg-[#0F044C]"}`}
                onClick={handleFollow}
            >
                {followedByCurrentUser ? <>Following</> : <>Follow</>}
            </button>
        </>
    )
}
