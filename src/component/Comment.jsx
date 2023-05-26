import {useNavigate} from "react-router-dom";

export default function Comment(props) {

    const navigate = useNavigate()

    function formatDate(date) {
        return new Date(date).toLocaleString()
    }

    return (
        <div className="border p-3">
            <div className="border-solid border-0 border-b border-blue-600 pb-2 flex flex-row gap-x-3">
                <img
                    src={props.author.avatarUrl}
                    alt={"User avatar..."}
                    className="rounded object-scale-down h-10 w-10 hover:cursor-pointer hover:rounded-lg
                    ease-in duration-200"
                    onClick={() => navigate("/profile?username=" + props.author.username)}
                />
                <div
                    className="flex flex-col"
                >
                    <div
                        className="font-medium text-base hover:cursor-pointer"
                        onClick={() => navigate("/profile?username=" + props.author.username)}
                    >
                        {props.author.username}
                    </div>
                    <div className="font-normal text-xs">
                        {formatDate(props.createdAt)}
                    </div>
                </div>
            </div>
            <div className="pt-2 break-normal">
                {props.body}
            </div>
        </div>
    )
}