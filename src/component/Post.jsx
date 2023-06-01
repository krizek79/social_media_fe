import { useNavigate } from "react-router-dom"

export default function Post(props) {
    const navigate = useNavigate()

    function formatDate(date) {
        return new Date(date).toLocaleString()
    }

    function formatBody(body) {
        const urlRegex = /(https?:\/\/\S+)/g
        return body.replace(urlRegex, url => {
            return `
                <a 
                    href="${url}" target="_blank" rel="noopener noreferrer" 
                    class="text-blue-500 hover:underline break-all"
                >
                    ${url}
                </a>
            `
        })
    }

    return (
        <>
            <div
                className="p-5 border rounded hover:cursor-pointer hover:bg-gray-100"
                onClick={() => navigate("/post?id=" + props.id)}
            >
                <div className="border-solid border-0 border-b border-blue-600 pb-2 flex flex-row gap-x-3">
                    <img
                        src={props.owner.avatarUrl}
                        alt="Profile picture"
                        className="rounded object-scale-down h-12 w-12 hover:cursor-pointer hover:grayscale-[50%]
                        duration-200"
                        onClick={(e) => {
                            e.stopPropagation()
                            navigate("/profile?username=" + props.owner.username)
                        }}
                    />
                    <div className="flex flex-col">
                    <span
                        className="font-medium text-lg hover:cursor-pointer hover:underline"
                        onClick={(e) => {
                            e.stopPropagation()
                            navigate("/profile?username=" + props.owner.username)
                        }}
                    >
                        {props.owner.username}
                    </span>
                        <div className="font-normal text-xs">
                            {formatDate(props.createdAt)}
                        </div>
                    </div>
                </div>
                <div
                    className="pt-2 break-normal"
                    dangerouslySetInnerHTML={{ __html: formatBody(props.body) }}
                ></div>
                <div className="flex w-full gap-x-6 pt-3">
                    <button className="hover:cursor-pointer hover:text-red-500 flex gap-x-3 items-center">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path>
                        </svg>
                        <span>0</span>
                    </button>
                    <button className="hover:cursor-pointer hover:text-blue-500 flex gap-x-3 items-center">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"></path>
                        </svg>
                        <span>{props.numberOfComments}</span>
                    </button>
                </div>
            </div>
        </>
    )
}
