import ExploreProfilePreview from "./ExploreProfilePreview.jsx";

export default function ExploreSearchResultList() {

    return (
        <section className="flex flex-col gap-y-1 w-full">
            <ExploreProfilePreview/>
            <ExploreProfilePreview/>
            <ExploreProfilePreview/>
            <div className="flex w-full justify-center mt-6 mb-3">
                <button className="text-blue-500 hover:underline">
                    Show more
                </button>
            </div>
        </section>
    )
}