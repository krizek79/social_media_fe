import React, {useState} from "react";
import useExploreSearch from "./useExploreSearch.js";
import ExploreProfilePreview from "./ExploreProfilePreview.jsx";
import ShowMoreButton from "../util/ShowMoreButton.jsx";
import Loading from "../util/Loading.jsx";

export default function ExploreSearch() {

    const [query, setQuery] = useState("")
    const [page, setPage] = useState(0)
    const {
        loading,
        results,
        hasMore,
        showResults,
        toggleSearchList
    } = useExploreSearch(query, page)

    function handleChange(e) {
        setQuery(e.target.value)
        setPage(0)
    }

    function handleShowMore() {
        setPage((prevPageNumber) => prevPageNumber + 1)
    }

    return (
        <div className="flex flex-col">
            <div
                className="flex justify-between rounded border items-center focus:outline-none focus:ring-2
                focus:ring-blue-600"
            >
                <input
                    className="w-full px-4 py-2 bg-white text-black focus:border focus:rounded focus:outline-none
                    focus:ring-1 focus:ring-blue-600"
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search for profile"
                />
                {query !== "" && (
                    showResults ? (
                        <button onClick={toggleSearchList} className="w-8 h-8 px-1 bg-white">
                            <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                    ) : (
                        <button onClick={toggleSearchList} className="w-8 h-8 px-1 bg-white">
                            <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                            </svg>
                        </button>
                    )
                )}
            </div>
            {showResults && (
                <div className="flex flex-col w-full">
                    {results.map(profile => (
                        <ExploreProfilePreview key={profile.id} profile={profile}/>
                    ))}
                    {hasMore && results.length > 0 && <ShowMoreButton handleShowMore={handleShowMore} />}
                    {loading && <Loading />}
                </div>
            )}
        </div>
    )
}