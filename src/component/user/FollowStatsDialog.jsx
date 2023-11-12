import {Dialog, Transition} from "@headlessui/react";
import React, {Fragment, useContext, useEffect, useState} from "react";
import {AuthContext} from "../security/AuthContext.js";
import ExploreProfilePreview from "../explore/ExploreProfilePreview.jsx";
import appUserService from "../../api/AppUserApi.js";
import Loading from "../util/Loading.jsx";
import ShowMoreButton from "../util/ShowMoreButton.jsx";

export default function FollowStatsDialog(props) {

    const PAGE_SIZE = 5
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(false)
    const { logout } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)
    const [profiles, setProfiles] = useState([])
    const [loading, setLoading] = useState(false)
    const urlParams = new URLSearchParams(window.location.search)
    const username = urlParams.get("username")

    function handleShowMore() {
        setPage((prevPageNumber) => prevPageNumber + 1)
    }

    function toggleDialog() {
        setIsOpen(!isOpen)
    }

    function getFollowing() {
        setLoading(true)
        appUserService.getFollowing(page, PAGE_SIZE, username)
            .then(response => {
                setProfiles((prevProfiles) => {
                    return [...new Set([...prevProfiles, ...response.data])]
                })
                setHasMore(response.data.length > 0)
            })
            .catch(error => {
                if (error.response.status === 401) {
                    logout()
                }
                console.log(error.response.status + ": " + error.response.data.message)
            })
            .finally(() => setLoading(false))
    }

    function getFollowers() {
        setLoading(true)
        appUserService.getFollowers(page, PAGE_SIZE, username)
            .then(response => {
                setProfiles((prevProfiles) => {
                    return [...new Set([...prevProfiles, ...response.data])]
                })
                setHasMore(response.data.length > 0)
            })
            .catch(error => {
                if (error.response.status === 401) {
                    logout()
                }
                console.log(error.response.status + ": " + error.response.data.message)
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        if (props.title === "Following") {
            getFollowing()
        }
        if (props.title === "Followers") {
            getFollowers()
        }
    }, [username, page])

    return (
        <>
            <button
                className="hover:cursor-pointer hover:underline decoration-1"
                onClick={toggleDialog}
            >
                <span className="font-bold">{props.amount}</span> {props.title}
            </button>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={toggleDialog}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-75"/>
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto px-3">
                        <div className="flex min-h-full items-center justify-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className="transform overflow-hidden transition-all w-full p-6 bg-[#F6F6F6]
                                    rounded-md shadow-md md:max-w-2xl"
                                >
                                    <div className="flex justify-between items-end pb-3 border-b">
                                        <Dialog.Title className="text-lg font-medium self-end text-[#0F044C]">
                                            {props.title}
                                        </Dialog.Title>
                                    </div>
                                    <div className="flex flex-col w-full">
                                        {loading ? <Loading/> : (
                                            profiles.map(profile => (
                                                <ExploreProfilePreview key={profile.id} profile={profile}/>
                                            ))
                                        )}
                                        {hasMore && <ShowMoreButton handleShowMore={handleShowMore}/>}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>

    )
}