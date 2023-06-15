import ExploreSearchBar from "./ExploreSearchBar.jsx";
import ExploreSearchResultList from "./ExploreSearchResultList.jsx";

export default function ExplorePage() {

    return (
        <main className="bg-gradient-to-b from-gray-900 to-gray-700 flex">
            <div
                className="flex flex-col overflow-y-auto mx-auto w-11/12 md:w-3/5 m-6 px-1 py-6 bg-white rounded
                shadow-md md:p-6 gap-y-3"
            >
                <ExploreSearchBar/>
                <ExploreSearchResultList/>
            </div>
        </main>
    )
}