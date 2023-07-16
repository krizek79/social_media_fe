import ExploreSearch from "./ExploreSearch.jsx";
import SuggestedProfilesCarousel from "./SuggestedProfilesCarousel.jsx";

export default function ExplorePage() {

    return (
        <div className="flex w-full justify-center">
            <div className="flex flex-col w-11/12 md:w-3/5">
                <section className="flex flex-col bg-[#F6F6F6] rounded px-3 md:px-6 py-6 gap-y-6">
                    <ExploreSearch/>
                    <SuggestedProfilesCarousel/>
                </section>
            </div>
        </div>
    )
}