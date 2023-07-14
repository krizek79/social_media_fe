import { useNavigate } from "react-router-dom"
import PostLikeButton from "./PostLikeButton.jsx";

export default function Post(props) {

    const navigate = useNavigate()

    function formatDate(date) {
        return new Date(date).toLocaleString()
    }

    function formatBody(body) {
        const urlRegex = /(https?:\/\/\S+)/g
        const lineBreakRegex = /\n/g
        const bodyWithLineBreaks = body.replace(lineBreakRegex, "<br>")

        return bodyWithLineBreaks.replace(urlRegex, url => {
            return `
            <a 
                href="${url}" target="_blank" rel="noopener noreferrer" 
                class="text-blue-600 hover:underline break-all"
            >
                ${url}
            </a>
        `
        })
    }

    return (
        <>
            <div
                className="px-3 py-3 border rounded hover:cursor-pointer hover:bg-gray-200"
                onClick={() => navigate("/post?id=" + props.post.id)}
            >
                <div className="border-solid border-0 border-b border-[#141E61] pb-2 flex flex-row gap-x-3">
                    <img
                        src={props.post.author.avatarUrl}
                        alt="Profile picture"
                        className="rounded-full object-scale-down h-12 w-12 hover:cursor-pointer hover:grayscale-[50%]
                        duration-200"
                        onClick={(e) => {
                            e.stopPropagation()
                            navigate("/profile?username=" + props.post.author.username)
                        }}
                    />
                    <div className="flex flex-col">
                    <span
                        className="font-medium text-lg hover:cursor-pointer hover:underline"
                        onClick={(e) => {
                            e.stopPropagation()
                            navigate("/profile?username=" + props.post.author.username)
                        }}
                    >
                        {props.post.author.username}
                    </span>
                        <div className="font-normal text-xs">
                            {formatDate(props.post.createdAt)}
                        </div>
                    </div>
                </div>
                <div
                    className="pt-2 break-normal"
                    dangerouslySetInnerHTML={{ __html: formatBody(props.post.body) }}
                ></div>
                <div className="flex w-full gap-x-6 pt-3">
                    <PostLikeButton post={props.post}/>
                    <span>Comments ({props.post.numberOfComments})</span>
                </div>
            </div>
        </>
    )
}
