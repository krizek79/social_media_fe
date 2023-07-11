import ExploreSearch from "./ExploreSearch.jsx";

export default function ExplorePage() {

    return (
        <div className="flex w-full justify-center">
            <div className="flex flex-col w-11/12 md:w-3/5">
                <section className="flex flex-col bg-[#F6F6F6] rounded px-1 md:px-6 py-6 gap-y-3">
                    <ExploreSearch/>
                </section>
            </div>
        </div>
    )
}