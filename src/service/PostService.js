import axios from "axios"

const POST_API_BASE_URL = "http://localhost:8080/posts"

export default new class PostService {

    getAllPosts() {
        return axios.get(POST_API_BASE_URL, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("authenticationToken")
            }
        })
    }

    getPostById(id) {
        return axios.get(POST_API_BASE_URL + "/" + id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("authenticationToken")
            }
        })
    }

    createPost(request) {
        return axios.post(POST_API_BASE_URL, request, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("authenticationToken")
            }
        })
    }

    updatePost(id, request) {
        return axios.patch(POST_API_BASE_URL + "/" + id, request, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("authenticationToken")
            }
        })
    }

    deletePost(id) {
        return axios.delete(POST_API_BASE_URL + "/" + id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("authenticationToken")
            }
        })
    }

    getAllPostsByUsername(username) {
        return axios.get(POST_API_BASE_URL + "?username=" + username, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("authenticationToken")
            }
        })
    }
}