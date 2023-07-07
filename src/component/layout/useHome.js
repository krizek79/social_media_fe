import {useContext, useEffect, useState} from "react"
import postService from "../../api/PostApi.js"
import {AuthContext} from "../security/AuthContext.js";

export default function useHome(page) {

    const { logout } = useContext(AuthContext)
    const PAGE_SIZE = 5
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setLoading(true)
        postService.getAllPosts(page, PAGE_SIZE)
            .then((response) => {
                setPosts((prevPosts) => {
                    return [...new Set([...prevPosts, ...response.data])]
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

    const updatePosts = (newPosts) => {
        setPosts((prevPosts) => [...newPosts, ...prevPosts]);
    }

    return { loading, posts, hasMore, updatePosts }
}
