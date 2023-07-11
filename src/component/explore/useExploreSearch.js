import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../security/AuthContext.js";
import appUserApi from "../../api/AppUserApi.js";
import axios, {isCancel} from "axios";

export default function useExploreSearch(query, page) {

    const PAGE_SIZE = 5
    const { logout } = useContext(AuthContext)
    const [results, setResults] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const cancelTokenSource = axios.CancelToken.source()

    useEffect(() => {
        setResults([])
    }, [query])

    useEffect(() => {
        if (query === "") return
        setLoading(true)
        appUserApi.searchForAppUsersLikeUsername(page, PAGE_SIZE, cancelTokenSource.token, query)
            .then(response => {
                setResults((prevResults) => {
                    return [...new Set([...prevResults, ...response.data])]
                })
                setHasMore(response.data.length > 0)
                setShowResults(true)
            })
            .catch(e => {
                if (isCancel(e)) {
                    return
                }
                if (e.response?.status === 401) {
                    logout()
                } else {
                    console.log(e.response?.status + ": " + e.response?.data?.message)
                }
                setShowResults(false)
            })
            .finally(() => {
                setLoading(false)
            })
        return () => {
            cancelTokenSource.cancel()
        }
    }, [query, page])

    const toggleSearchList = () => {
        setShowResults(!showResults)
    }

    return { results, hasMore, loading, showResults, toggleSearchList }
}