export default function ExploreProfilePreview(props) {
    
    return (
        <a href={`/profile?username=${props.profile.username}`}>
            <div
                className="flex flex-row gap-x-6 w-full px-3 py-3 items-center hover:cursor-pointer
                hover:bg-gray-200"
            >
                <img
                    src={props.profile.avatarUrl}
                    alt={"Profile picture"}
                    className={"w-10 h-10 rounded-full"}
                />
                <div className="flex flex-col w-full">
                    <span className="font-medium text-base">
                        {props.profile.username}
                    </span>
                    <span>
                        {props.profile.email}
                    </span>
                </div>
            </div>
        </a>
    )
}