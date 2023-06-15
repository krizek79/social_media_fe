export default function ExploreProfilePreview(props) {
    
    return (
        <a href={"#"}>
            <div
                className="flex flex-row gap-x-6 border w-full px-6 py-3 items-center hover:cursor-pointer
            hover:bg-gray-100"
            >
                <img
                    src={"https://ui-avatars.com/api/?name=Matej%20Križan&background=random&size=256"}
                    alt={"Profile picture"}
                    className={"w-16 h-16 rounded-full"}
                />
                <div className="flex flex-col w-full">
                <span className="font-medium text-lg">
                    Matej Križan
                </span>
                    <span>
                    krizan.matej79@gmail.com
                </span>
                </div>
            </div>
        </a>
    )
}