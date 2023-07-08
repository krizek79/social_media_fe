import ExploreProfilePreview from "./ExploreProfilePreview.jsx";
import ShowMoreButton from "../util/ShowMoreButton.jsx";

export default function ExploreSearchResultList() {

    return (
        <section className="flex flex-col gap-y-1 w-full">
            <ExploreProfilePreview/>
            <ExploreProfilePreview/>
            <ExploreProfilePreview/>
            <ShowMoreButton/>
        </section>
    )
}