import postService from "../service/PostService.js"
import {useState} from "react";

export default function CreatePost() {

    const [request, setRequest] = useState({
        body: ""
    })

    function handleChange(e) {
        setRequest({...request, [e.target.name]: e.target.value})
    }

    function createPost() {
        postService.createPost(request)
            .then(response => {
                setRequest({...request, body: ""})
                console.log(response)
            })
            .catch(e => {
                console.log(e.response.status + ": " + e.response.data.message)
            })
    }

    return (
        <form className="p-5 border rounded mb-3">
            <textarea
                id="body"
                rows="4"
                name={"body"}
                value={request.body}
                className="mb-2 block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-700
                focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={handleChange}
                placeholder="What is on your mind?">
            </textarea>
            <div className="flex justify-end w-full">
                <button
                    className="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700
                    rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600text-sm"
                    onClick={createPost}
                >
                    Publish
                </button>
            </div>
        </form>
    )
}