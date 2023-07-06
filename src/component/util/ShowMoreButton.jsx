import React from "react";

export default function ShowMoreButton(props) {

    return (
        <button
            className="text-blue-500 hover:underline w-full flex justify-center mt-3"
            onClick={props.handleShowMore}
        >
            <svg
                fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                className="h-8 w-8"
            >

                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"></path>
            </svg>
        </button>
    )
}