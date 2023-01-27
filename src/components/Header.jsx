import React from "react";

export default function Header() {

    return (
        <header className={"flex py-6 px-10 bg-white shadow-md items-end justify-between top-0"}>
            <div className={""}>
                <h1 className={"text-blue-700 text-3xl"}>Social Media</h1>
            </div>
            {/*<div className={"gap-x-6 flex"}>*/}
            {/*    <div className={"text-center"}>*/}
            {/*        <a*/}
            {/*            className={"text-blue-600 text-lg cursor-pointer"}*/}
            {/*        >*/}
            {/*            Log out*/}
            {/*        </a>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </header>
    )
}