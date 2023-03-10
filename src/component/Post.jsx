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
                <div className="border-solid border-0 border-b border-blue-600 pb-2 flex flex-row gap-x-3">
                    <img
                        src={props.owner.avatarUrl}
                        alt={"User avatar..."}
                        className="rounded object-scale-down h-12 w-12"
                    />
                    <div
                        className="flex flex-col"
                    >
                        <div className="font-medium text-lg">
                            {props.owner.username}
                        </div>
                        <div className="font-normal text-xs">
                            {formatDate(props.createdAt)}
                        </div>
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
                    owner={props.owner}
                    body={props.body}
                    createdAt={formatDate(props.createdAt)}
                    toggle={toggleModal}
                />
            )}
        </>
    )
}