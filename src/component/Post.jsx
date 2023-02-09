import {useState} from "react";
import PostDetails from "./PostDetails";

export default function Post(props) {

    const [modal, setModal] = useState(false)

    function toggleModal() {
        setModal(!modal)
    }

    function formatDate(date) {
        return new Date(date).toLocaleString()
    }

    return (
        <>
            <div className={"p-5 border rounded"}>
                <div
                    className="border-solid border-0 border-b border-blue-600 pb-2 justify-between flex flex-col"
                >
                    <div className="font-medium text-lg">
                        {props.ownerUsername}
                    </div>
                    <div className="font-normal text-xs">
                        {formatDate(props.createdAt)}
                    </div>
                </div>
                <div className="pt-2 break-normal">
                    {props.body}
                </div>
                <div className="flex w-full justify-center pt-3">
                    <a
                        className="text-blue-600 cursor-pointer hover:text-blue-500"
                        onClick={toggleModal}
                    >
                        Details
                    </a>
                </div>
            </div>

            {modal && (
                <PostDetails
                    key={props.id}
                    id={props.id}
                    ownerUsername={props.ownerUsername}
                    body={props.body}
                    createdAt={formatDate(props.createdAt)}
                    toggle={toggleModal}
                />
            )}
        </>
    )
}