import postService from "../service/PostService.js"
import {useState} from "react";
import LoadingModal from "./LoadingModal.jsx";

export default function CreatePost() {

    const [request, setRequest] = useState({
        body: ""
    })
    const [loading, setLoading] = useState(false)

    function handleChange(e) {
        setRequest({...request, [e.target.name]: e.target.value})
    }

    function createPost() {
        setLoading(true)
        postService.createPost(request)
            .then(response => {
                console.log(response)
                setRequest({...request, body: ""})
                setLoading(false)
            })
            .catch(e => {
                console.log(e.response.status + ": " + e.response.data.message)
                setLoading(false)
            })
    }

    return (
        <>
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

            {loading && (
                <LoadingModal/>
            )}
        </>
    )
}