import axios from "axios"

const POST_API_BASE_URL = "http://localhost:8080/posts"

export default new class PostService {

    getAllPosts() {
        return axios.get(POST_API_BASE_URL)
    }

    getPostById(id) {
        return axios.get(POST_API_BASE_URL + "/" + id)
    }

    createPost(request) {
        return axios.post(POST_API_BASE_URL, request)
    }

    updatePost(id, request) {
        return axios.patch(POST_API_BASE_URL + "/" + id, request)
    }

    deletePost(id) {
        return axios.delete(POST_API_BASE_URL + "/" + id)
    }
}