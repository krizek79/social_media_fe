export default function Post(props) {

    function formatDate(date) {
        return new Date(date).toLocaleString()
    }

    return (
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
        </div>
    )
}