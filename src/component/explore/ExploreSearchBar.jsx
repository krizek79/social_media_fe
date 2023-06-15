import {useId} from "react";

export default function ExploreSearchBar() {

    const searchBarInputId = useId()

    function handleChange() {

    }

    return (
        <div className="flex">
            <input
                id={searchBarInputId}
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-700
                focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                type={"text"}
                onChange={handleChange}
                placeholder={"Search for profile"}
            />
        </div>
    )
}