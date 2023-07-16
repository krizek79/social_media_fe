import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../security/AuthContext.js";
import appUserApi from "../../api/AppUserApi.js";

export default function SuggestedProfilesCarousel() {

    const { logout } = useContext(AuthContext)
    const [profiles, setProfiles] = useState([])
    const PAGE_SIZE = 5
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setLoading(true)
        appUserApi.getRandomUnfollowedAppUsers(page, PAGE_SIZE)
            .then((response) => {
                setProfiles((prevProfiles) => {
                    return [...new Set([...prevProfiles, ...response.data])]
                })
                setHasMore(response.data.length > 0)
            })
            .catch((e) => {
                if (e.response?.status === 401) {
                    logout()
                } else {
                    console.log(e.response?.status + ": " + e.response?.data?.message)
                }
            })
            .finally(() => setLoading(false))
    }, [page])


    return (
        <div className="flex flex-col w-full gap-y-3 border rounded p-3">
            <h1 className="text-xl font-medium">Explore new profiles</h1>
            <div className="flex overflow-x-auto py-3">
                {profiles.map((profile) => (
                    <a
                        key={profile.username}
                        className={`flex-shrink-0 w-1/3 md:w-1/5 flex gap-x-3`}
                        href={`/profile?username=${profile.username}`}
                    >
                        <div className="flex flex-col p-3 justify-between w-full">
                            <img
                                src={profile.avatarUrl}
                                alt={profile.username}
                                className="flex justify-center w-full h-auto rounded-full hover:cursor-pointer
                                hover:grayscale-[50%] duration-300"
                            />
                            <span className="mt-2 font-medium text-center hover:underline hover:cursor-pointer h-full">
                                {profile.username}
                            </span>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}